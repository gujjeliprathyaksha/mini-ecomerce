import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { saveBeautyWishlist, readBeautyWishlist } from '../data/beautyWishlist.js';
import api from '../services/api.js';

const money = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;
const objectIdPattern = /^[a-f\d]{24}$/i;
const LAST_ORDER_KEY = 'lumora-beauty-last-order';
const ORDER_HISTORY_KEY = 'lumora-order-history';
const productPath = (product) => product?.department === 'Beauty'
  ? `/beauty/product/${product.slug || product.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
  : product?.slug && !objectIdPattern.test(product?._id || '')
    ? `/catalog/${product.slug}`
    : `/products/${product?._id}`;

export default function BeautyCheckout() {
  const { cart, removeItem, updateItemQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState({ name: '', phone: '', house: '', street: '', city: '', state: '', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [order, setOrder] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LAST_ORDER_KEY) || 'null');
    } catch {
      return null;
    }
  });
  const [error, setError] = useState('');
  const [working, setWorking] = useState(false);
  const subtotal = cart.items.reduce((total, item) => total + (item.product?.price || 0) * item.qty, 0);
  const originalTotal = cart.items.reduce((total, item) => total + (item.product?.originalPrice || item.product?.price || 0) * item.qty, 0);
  const savings = Math.max(0, originalTotal - subtotal);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  const isBeautyCart = cart.items.length > 0 && cart.items.every((item) => item.product?.department === 'Beauty');

  async function changeQuantity(item, quantity) {
    const stock = Number(item.product?.stock || 0);
    if (quantity < 1 || (stock > 0 && quantity > stock)) return;
    try {
      await updateItemQuantity(item._id, quantity);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to update this quantity.');
    }
  }

  async function moveToWishlist(item) {
    const product = item.product;
    const saved = readBeautyWishlist();
    if (!saved.some((entry) => String(entry._id || entry.id) === String(product?._id || product?.id))) {
      saveBeautyWishlist([...saved, product]);
    }
    await removeItem(item._id);
  }

  async function placeOrder(event) {
    event.preventDefault();
    if (!user) {
      setError('Sign in to place an order.');
      return;
    }

    setWorking(true);
    setError('');
    try {
      const serverItems = cart.items.filter((item) => objectIdPattern.test(item.product?._id || ''));
      if (serverItems.length !== cart.items.length) {
        throw new Error('One or more products are unavailable for checkout. Remove them and add products from the catalog.');
      }
      const deliveryAddress = Object.fromEntries(
        Object.entries(address).map(([field, value]) => [field, value.trim()]),
      );
      const { data: savedOrder } = await api.post('/orders', {
        items: serverItems.map((item) => ({ product: item.product._id, qty: item.qty })),
        subtotal,
        gstAmount: gst,
        totalAmount: total,
        deliveryAddress,
        paymentMethod,
      });
      const expectedDelivery = savedOrder.expectedDeliveryAt;
      const nextOrder = {
        id: savedOrder._id,
        trackingNumber: savedOrder.trackingNumber,
        status: savedOrder.status,
        currentLocation: savedOrder.currentLocation,
        items: savedOrder.items,
        address: savedOrder.deliveryAddress,
        paymentMethod: savedOrder.paymentMethod,
        subtotal: savedOrder.subtotal,
        savings,
        gst: savedOrder.gstAmount,
        total: savedOrder.totalAmount,
        expectedDelivery,
      };
      clearCart();
      setOrder(nextOrder);
      try {
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(nextOrder));
        const history = JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY) || '[]');
        history.push({
          orderId: nextOrder.id,
          trackingNumber: nextOrder.trackingNumber,
          status: nextOrder.status,
          currentLocation: nextOrder.currentLocation,
          expectedDeliveryAt: expectedDelivery,
          createdAt: savedOrder.createdAt,
          deliveryAddress: savedOrder.deliveryAddress,
          totalAmount: savedOrder.totalAmount,
          items: nextOrder.items,
        });
        localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(history.slice(-25)));
      } catch {
        // The persisted account order remains available from the Orders page.
      }
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Checkout could not be completed. Please try again.');
    } finally {
      setWorking(false);
    }
  }

  function updateAddress(event) {
    setAddress((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  if (order) return <section className="beauty-checkout-page"><div className="beauty-order-success"><span>✓</span><p className="beauty-kicker">LUMORA ORDER</p><h1>Order Placed Successfully!</h1><p>Your order is being prepared for delivery.</p><div className="beauty-order-meta"><div><small>ORDER ID</small><strong>{order.id}</strong></div><div><small>TRACKING NUMBER</small><strong>{order.trackingNumber}</strong></div><div><small>EXPECTED DELIVERY</small><strong>{new Date(order.expectedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></div></div><div className="beauty-order-items">{order.items.map(({ product, qty }) => <div key={product._id || product.id}><span>{product.name} × {qty}</span><strong>{money(product.price * qty)}</strong></div>)}</div><div className="beauty-order-address"><strong>Delivering to</strong><p>{order.address.name} · {order.address.phone}<br />{order.address.house}, {order.address.street}<br />{order.address.city}, {order.address.state} {order.address.pincode}</p><span>Payment: {order.paymentMethod}</span></div><strong className="beauty-order-total">Total paid: {money(order.total)}</strong><div className="beauty-order-actions"><Link className="beauty-add" to="/track-order">Track order</Link><Link className="beauty-buy" to="/">Continue shopping</Link></div></div></section>;

  if (!cart.items.length) return <section className="beauty-checkout-page"><div className="beauty-empty">Your bag is empty. <Link to="/">Explore the store</Link></div></section>;

  return <section className="beauty-checkout-page"><header className="beauty-checkout-heading"><div><Link className="beauty-breadcrumb" to={isBeautyCart ? '/beauty' : '/'}>{isBeautyCart ? 'Beauty /' : 'Shop /'}</Link><p className="beauty-kicker">YOUR SELECTED EDIT</p><h1>Shopping bag</h1></div><span>{cart.items.reduce((count, item) => count + item.qty, 0)} items</span></header>{error && <p className="beauty-checkout-error" role="alert">{error}{!user && <> <Link to="/login">Sign in</Link></>}</p>}<form className="beauty-checkout-layout" onSubmit={placeOrder}><div className="beauty-bag-list"><h2>Your items</h2>{cart.items.map((item) => {
    const product = item.product || {};
    const inStock = Number(product.stock || 0) > 0;
    return <article className="beauty-bag-item" key={item._id}><Link to={productPath(product)}><img src={product.imageUrl || product.images?.[0]} alt={product.name || 'Product'} /></Link><div className="beauty-bag-copy"><span className="beauty-brand">{product.brand || product.category || 'LUMORA'}</span><Link to={productPath(product)}>{product.name || 'Unavailable product'}</Link><span>{inStock ? `${product.stock} available` : 'Stock status unavailable'}</span><div className="beauty-quantity"><button type="button" aria-label={`Decrease ${product.name} quantity`} disabled={item.qty <= 1} onClick={() => changeQuantity(item, item.qty - 1)}>−</button><strong>{item.qty}</strong><button type="button" aria-label={`Increase ${product.name} quantity`} disabled={inStock && item.qty >= product.stock} onClick={() => changeQuantity(item, item.qty + 1)}>+</button><button type="button" className="beauty-move-wishlist" onClick={() => moveToWishlist(item)}>Move to wishlist</button><button type="button" className="beauty-remove" onClick={() => removeItem(item._id)}>Remove</button></div></div><strong className="beauty-bag-price">{money(product.price * item.qty)}</strong></article>;
  })}</div><aside className="beauty-checkout-side"><section className="beauty-checkout-panel"><h2>Delivery address</h2><div className="beauty-address-form"><label>Full name<input name="name" value={address.name} onChange={updateAddress} autoComplete="name" required /></label><label>Mobile number<input name="phone" value={address.phone} onChange={updateAddress} inputMode="numeric" pattern="[0-9]{10}" autoComplete="tel" required /></label><label>House / Flat<input name="house" value={address.house} onChange={updateAddress} required /></label><label>Street<input name="street" value={address.street} onChange={updateAddress} autoComplete="street-address" required /></label><label>City<input name="city" value={address.city} onChange={updateAddress} autoComplete="address-level2" required /></label><label>State<input name="state" value={address.state} onChange={updateAddress} autoComplete="address-level1" required /></label><label>PIN code<input name="pincode" value={address.pincode} onChange={updateAddress} inputMode="numeric" pattern="[0-9]{6}" autoComplete="postal-code" required /></label></div></section><section className="beauty-checkout-panel"><h2>Payment method</h2><div className="beauty-payment-options">{['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash on Delivery'].map((method) => <label key={method}><input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />{method}</label>)}</div></section><section className="beauty-checkout-panel beauty-order-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>{savings > 0 && <div><span>You save</span><strong>{money(savings)}</strong></div>}<div><span>GST (18%)</span><strong>{money(gst)}</strong></div><div><span>Delivery</span><strong>FREE</strong></div><div className="beauty-summary-total"><span>Total payable</span><strong>{money(total)}</strong></div><button className="beauty-add beauty-place-order" type="submit" disabled={working}>{working ? 'Placing order…' : 'Place order securely'}</button><small>Expected delivery in 5–7 days.</small></section></aside></form></section>;
}