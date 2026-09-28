import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const orderStatuses = ['pending', 'packed', 'shipped', 'in-transit', 'out-for-delivery', 'delivered', 'cancelled'];
const statusLocations = {
  pending: 'Lumora Fulfillment Center',
  packed: 'Lumora Packing Hub',
  shipped: 'Regional Dispatch Center',
  'in-transit': 'On Route to Destination City',
  'out-for-delivery': 'Local Delivery Center',
  delivered: 'Destination',
  cancelled: 'Order cancelled',
};

function parsePagination(request) {
  const page = Math.max(Number.parseInt(request.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(request.query.limit, 10) || 10, 1), 100);
  return { page, limit, skip: (page - 1) * limit };
}

function invalidId(id) {
  return !mongoose.isValidObjectId(id);
}

function normalizeTrackingLocation(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function handleDatabaseError(response, error, fallbackMessage) {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return response.status(400).json({ message: 'Invalid order data' });
  }
  return response.status(500).json({ message: fallbackMessage });
}

export async function createOrder(request, response) {
  const { items, deliveryAddress, paymentMethod } = request.body;
  if (!Array.isArray(items) || items.length === 0) {
    return response.status(400).json({ message: 'At least one order item is required' });
  }
  const paymentOptions = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash on Delivery'];
  if (paymentMethod && !paymentOptions.includes(paymentMethod)) {
    return response.status(400).json({ message: 'Invalid payment method' });
  }

  const quantities = new Map();
  for (const item of items) {
    if (!item?.product || invalidId(item.product) || !Number.isInteger(item.qty) || item.qty < 1) {
      return response.status(400).json({ message: 'Each item needs a valid product and positive quantity' });
    }
    quantities.set(item.product, (quantities.get(item.product) || 0) + item.qty);
  }

  try {
    const products = await Product.find({ _id: { $in: [...quantities.keys()] } });
    const productsById = new Map(products.map((product) => [product.id, product]));

    for (const [productId, qty] of quantities) {
      const product = productsById.get(productId);
      if (!product) {
        return response.status(400).json({ message: `Product ${productId} was not found` });
      }
      if (product.stock < qty) {
        return response.status(400).json({ message: `${product.name} does not have enough stock` });
      }
    }

    const orderItems = [...quantities].map(([productId, qty]) => ({
      product: productId,
      qty,
      price: productsById.get(productId).price,
    }));
    const totalAmount = orderItems.reduce((total, item) => total + item.price * item.qty, 0);
    const expectedDeliveryAt = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000);
    const order = await Order.create({
      user: request.user._id,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      paymentMethod: paymentMethod || 'UPI',
      expectedDeliveryAt,
      currentLocation: statusLocations.pending,
    });

    return response.status(201).json(await order.populate('items.product'));
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to create order');
  }
}

export async function trackOrder(request, response) {
  const identifier = String(request.body.identifier || '').trim();
  const location = String(request.body.location || '').trim();
  if (!identifier || identifier.length > 120 || !location || location.length > 180) {
    return response.status(400).json({ message: 'Enter your order ID or tracking number and delivery location' });
  }

  const filter = mongoose.isValidObjectId(identifier)
    ? { _id: identifier }
    : { trackingNumber: identifier.toUpperCase() };

  try {
    const order = await Order.findOne(filter).populate({ path: 'items.product', select: 'name' });
    if (!order) return response.status(404).json({ message: 'No order matched that ID or tracking number' });
    const destination = normalizeTrackingLocation([
      order.deliveryAddress?.house,
      order.deliveryAddress?.street,
      order.deliveryAddress?.city,
      order.deliveryAddress?.state,
      order.deliveryAddress?.pincode,
    ].filter(Boolean).join(' '));
    if (!destination.includes(normalizeTrackingLocation(location))) {
      return response.status(404).json({ message: 'No order matched that ID, tracking number and delivery location' });
    }

    return response.json({
      orderId: order._id.toString(),
      trackingNumber: order.trackingNumber,
      status: order.status,
      currentLocation: order.currentLocation,
      destination: [order.deliveryAddress?.city, order.deliveryAddress?.state, order.deliveryAddress?.pincode].filter(Boolean).join(', '),
      expectedDeliveryAt: order.expectedDeliveryAt,
      createdAt: order.createdAt,
      items: order.items.map((item) => ({ name: item.product?.name || 'Product', quantity: item.qty })),
    });
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to look up this order');
  }
}

export async function listOrders(request, response) {
  const { page, limit, skip } = parsePagination(request);
  const filter = { user: request.user._id };

  try {
    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('items.product')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter),
    ]);

    return response.json({ orders, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to fetch orders');
  }
}

export async function getOrder(request, response) {
  if (invalidId(request.params.id)) {
    return response.status(404).json({ message: 'Order not found' });
  }

  try {
    const order = await Order.findOne({ _id: request.params.id, user: request.user._id })
      .populate('items.product');
    if (!order) {
      return response.status(404).json({ message: 'Order not found' });
    }
    return response.json(order);
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to fetch order');
  }
}

export async function updateOrderStatus(request, response) {
  const { status } = request.body;
  if (!orderStatuses.includes(status)) {
    return response.status(400).json({ message: 'Invalid order status' });
  }
  if (invalidId(request.params.id)) {
    return response.status(404).json({ message: 'Order not found' });
  }

  try {
    const order = await Order.findByIdAndUpdate(
      request.params.id,
      { status, currentLocation: statusLocations[status] },
      { new: true, runValidators: true },
    ).populate('items.product');
    if (!order) {
      return response.status(404).json({ message: 'Order not found' });
    }
    return response.json(order);
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to update order');
  }
}

export async function cancelOrder(request, response) {
  if (invalidId(request.params.id)) {
    return response.status(404).json({ message: 'Order not found' });
  }

  try {
    const order = await Order.findOne({ _id: request.params.id, user: request.user._id });
    if (!order) {
      return response.status(404).json({ message: 'Order not found' });
    }
    if (['delivered', 'cancelled'].includes(order.status)) {
      return response.status(400).json({ message: `Order is already ${order.status}` });
    }

    order.status = 'cancelled';
    order.currentLocation = statusLocations.cancelled;
    await order.save();
    return response.json({ message: 'Order cancelled' });
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to cancel order');
  }
}
