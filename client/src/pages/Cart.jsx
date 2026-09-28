import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';
import BeautyCheckout from './BeautyCheckout.jsx';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85';

export default function Cart() {
  const { cart, loading, subtotal, removeItem } = useCart();
  const { user } = useAuth();
  const [checkoutState, setCheckoutState] = useState('idle');
  const [checkoutError, setCheckoutError] = useState('');
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState({ name: '', phone: '', line: '', city: '', state: '', pincode: '' });
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  if (loading) return <div className="state-panel">Loading your cart...</div>;
  if (cart.items.length || localStorage.getItem('lumora-beauty-last-order')) return <BeautyCheckout />;

  async function checkout() {
    setCheckoutState('working');
    setCheckoutError('');
    try {
      const serverItems = cart.items.filter((item) => /^[a-f\d]{24}$/i.test(item.product?._id || ''));
      if (serverItems.length && user) {
        await api.post('/orders', { items: serverItems.map((item) => ({ product: item.product._id, qty: item.qty })) });
      }
      for (const item of cart.items) await removeItem(item._id);
      setOrder({
        id: `LUM-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        date: new Date().toLocaleString('en-IN'),
        address: { ...address },
        items: cart.items.map((item) => ({ name: item.product?.name || 'Product', description: item.product?.description || 'Everyday essential', qty: item.qty, price: item.product?.price || 0 })),
        subtotal,
        gst,
        total,
      });
      setCheckoutState('complete');
    } catch (error) {
      setCheckoutState('idle');
      setCheckoutError(error.response?.data?.message || 'Checkout could not be completed.');
    }
  }

  function updateAddress(event) {
    setAddress((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function downloadOrder() {
    if (!order) return;
    const lines = [
      'LUMORA ORDER RECEIPT',
      `Order ID: ${order.id}`,
      `Placed: ${order.date}`,
      '',
      'DELIVERY ADDRESS',
      `${order.address.name} · ${order.address.phone}`,
      `${order.address.line}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`,
      '',
      'ITEMS',
      ...order.items.map((item) => `${item.name} x${item.qty} - ₹${(item.price * item.qty).toLocaleString('en-IN')}`),
      '',
      `Subtotal: ₹${order.subtotal.toLocaleString('en-IN')}`,
      `GST (18%): ₹${order.gst.toLocaleString('en-IN')}`,
      'Delivery: FREE',
      `Total: ₹${order.total.toLocaleString('en-IN')}`,
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${order.id}-receipt.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (order) return <section className="content-page cart-page"><div className="order-confirmation"><div className="success-mark">✓</div><p className="eyebrow">Thank you for shopping with LUMORA</p><h1>Order confirmed.</h1><p>Your order is being prepared for delivery.</p><div className="order-id-card"><span>Order ID</span><strong>{order.id}</strong><small>{order.date}</small></div><div className="confirmation-actions"><button className="button button-dark" onClick={downloadOrder}>Download order ↧</button><Link className="button button-light" to="/products">Continue shopping</Link></div></div></section>;

  return <section className="content-page cart-page"><div className="cart-heading"><div><p className="eyebrow">Your selections</p><h1>Your cart.</h1><p>Review your choices, add delivery details, and place your order in one calm step.</p></div><div className="cart-count-card"><strong>{cart.items.reduce((count, item) => count + item.qty, 0)}</strong><span>items selected</span></div></div>{checkoutError && <div className="checkout-error">{checkoutError}</div>}{cart.items.length ? <form className="checkout-layout" onSubmit={(event) => { event.preventDefault(); checkout(); }}><div className="cart-items-panel"><div className="panel-heading"><div><p className="eyebrow">Ready to go</p><h2>Your items</h2></div><span>{cart.items.length} products</span></div>{cart.items.map((item) => <article className="cart-product-row" key={item._id}><div className="cart-product-thumb"><img src={item.product?.imageUrl || item.product?.images?.[0] || FALLBACK_IMAGE} alt={item.product?.name || 'Product'} onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = FALLBACK_IMAGE;
      }} /></div><div className="cart-product-copy"><div className="cart-product-topline"><span className="product-category">{item.product?.category || 'Everyday essential'}</span><button type="button" className="text-button" onClick={() => removeItem(item._id)}>Remove</button></div><Link className="product-name" to={/^[a-f\d]{24}$/i.test(item.product?._id || '') ? `/products/${item.product._id}` : '/products'}>{item.product?.name || 'Unavailable product'}</Link><p>{item.product?.description || 'A considered addition to your everyday.'}</p><span className="cart-quantity">Quantity {item.qty}</span></div><strong className="cart-product-price">₹{((item.product?.price || 0) * item.qty).toLocaleString('en-IN')}</strong></article>)}</div><div className="checkout-side"><div className="address-panel"><div className="panel-heading"><div><p className="eyebrow">Delivery details</p><h2>Add your address</h2></div><span>Required</span></div><div className="address-grid"><label>Full name<input name="name" value={address.name} onChange={updateAddress} required placeholder="Your name" /></label><label>Phone number<input name="phone" value={address.phone} onChange={updateAddress} required pattern="[0-9]{10}" placeholder="10-digit number" /></label><label className="address-wide">Address<input name="line" value={address.line} onChange={updateAddress} required placeholder="House no., street and area" /></label><label>City<input name="city" value={address.city} onChange={updateAddress} required placeholder="City" /></label><label>State<input name="state" value={address.state} onChange={updateAddress} required placeholder="State" /></label><label>PIN code<input name="pincode" value={address.pincode} onChange={updateAddress} required pattern="[0-9]{6}" placeholder="6-digit PIN" /></label></div></div><div className="order-summary-card"><div className="panel-heading"><div><p className="eyebrow">Order summary</p><h2>Pay securely</h2></div><span>18% GST</span></div><div className="summary-line"><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div><div className="summary-line"><span>GST (18%)</span><strong>₹{gst.toLocaleString('en-IN')}</strong></div><div className="summary-line"><span>Delivery</span><strong className="free-delivery">FREE</strong></div><div className="summary-total"><span>Total payable</span><strong>₹{total.toLocaleString('en-IN')}</strong></div><button className="button button-dark checkout-submit" type="submit" disabled={checkoutState === 'working'}>{checkoutState === 'working' ? 'Placing order...' : 'Place order securely ↗'}</button><small>By placing your order, you agree to our terms and delivery policy.</small></div></div></form> : <div className="state-panel empty-cart-state">Your cart is waiting for something special.<Link to="/products">Browse products</Link></div>}</section>;
}
