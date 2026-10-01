import mongoose from 'mongoose';
import { randomBytes } from 'node:crypto';

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be a whole number',
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: 'An order must contain at least one item',
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    subtotal: {
      type: Number,
      min: 0,
      default: 0,
    },
    gstAmount: {
      type: Number,
      min: 0,
      default: 0,
    },
    trackingNumber: {
      type: String,
      unique: true,
      index: true,
      sparse: true,
      default: () => `LMR-${randomBytes(6).toString('hex').toUpperCase()}`,
    },
    currentLocation: {
      type: String,
      trim: true,
      default: 'Lumora Fulfillment Center',
    },
    deliveryAddress: {
      name: { type: String, trim: true, required: true },
      phone: { type: String, trim: true, required: true, match: /^[0-9]{10}$/ },
      house: { type: String, trim: true, required: true },
      street: { type: String, trim: true, required: true },
      city: { type: String, trim: true, required: true },
      state: { type: String, trim: true, required: true },
      pincode: { type: String, trim: true, required: true, match: /^[0-9]{6}$/ },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash on Delivery'],
    },
    expectedDeliveryAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'packed', 'shipped', 'in-transit', 'out-for-delivery', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
