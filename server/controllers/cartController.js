import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
}

function invalidId(id) {
  return !mongoose.isValidObjectId(id);
}

function handleDatabaseError(response, error, fallbackMessage) {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return response.status(400).json({ message: 'Invalid cart data' });
  }
  return response.status(500).json({ message: fallbackMessage });
}

export async function getCart(request, response) {
  try {
    const cart = await getOrCreateCart(request.user._id);
    return response.json(await cart.populate('items.product'));
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to fetch cart');
  }
}

export async function addCartItem(request, response) {
  const { productId, qty } = request.body;
  if (!productId || invalidId(productId) || !Number.isInteger(qty) || qty < 1) {
    return response.status(400).json({ message: 'A valid productId and positive quantity are required' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return response.status(404).json({ message: 'Product not found' });
    }

    const cart = await getOrCreateCart(request.user._id);
    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    const nextQuantity = (existingItem?.qty || 0) + qty;

    if (nextQuantity > product.stock) {
      return response.status(400).json({ message: `Only ${product.stock} units of ${product.name} are available` });
    }

    if (existingItem) {
      existingItem.qty = nextQuantity;
    } else {
      cart.items.push({ product: productId, qty });
    }

    await cart.save();
    return response.json(await cart.populate('items.product'));
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to update cart');
  }
}

export async function removeCartItem(request, response) {
  const { itemId } = request.params;
  if (invalidId(itemId)) {
    return response.status(404).json({ message: 'Cart item not found' });
  }

  try {
    const cart = await Cart.findOne({ user: request.user._id });
    const item = cart?.items.id(itemId);
    if (!item) {
      return response.status(404).json({ message: 'Cart item not found' });
    }

    cart.items.pull(itemId);
    await cart.save();
    return response.json(await cart.populate('items.product'));
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to remove cart item');
  }
}

export async function updateCartItem(request, response) {
  const { itemId } = request.params;
  const { qty } = request.body;
  if (invalidId(itemId) || !Number.isInteger(qty) || qty < 1) {
    return response.status(400).json({ message: 'A valid item and positive quantity are required' });
  }

  try {
    const cart = await Cart.findOne({ user: request.user._id });
    const item = cart?.items.id(itemId);
    if (!item) return response.status(404).json({ message: 'Cart item not found' });

    const product = await Product.findById(item.product);
    if (!product || qty > product.stock) {
      return response.status(400).json({ message: `Only ${product?.stock || 0} units are available` });
    }

    item.qty = qty;
    await cart.save();
    return response.json(await cart.populate('items.product'));
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to update cart item');
  }
}
