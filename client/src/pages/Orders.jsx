import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { beautyProducts } from '../data/beautyCatalog.js';
import { shoppingProducts } from '../data/shoppingCatalog.js';
import api from '../services/api.js';

const TRACKING_STEPS = [
  ['pending', 'Order Placed'],
  ['packed', 'Packed'],
  ['shipped', 'Shipped'],
  ['in-transit', 'In Transit'],
  ['out-for-delivery', 'Out for Delivery'],
  ['delivered', 'Delivered'],
];
const fallbackImage = beautyProducts[0]?.imageUrl || shoppingProducts[0]?.imageUrl;
const money = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;

function readGuestOrders() {
  try {
    return JSON.parse(localStorage.getItem('lumora-order-history') || '[]');
  } catch {
    return [];
  }
}

function statusIndex(status) {
  const index = TRACKING_STEPS.findIndex(([value]) => value === status);
  return index < 0 ? 0 : index;
}

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Within 3–5 days';
}

function getDestination(order) {
  const address = order.deliveryAddress || {};
  return [address.city, address.state, address.pincode].filter(Boolean).join(', ') || order.destination || 'Delivery address saved';
}

function normalizeGuestOrder(order) {
  const items = (order.items || []).map((item) => ({
    ...item,
    product: item.product || {},
    qty: item.qty || item.quantity || 1,
    price: item.price || item.product?.price || 0,
  }));
  return {
    ...order,
    _id: order.orderId || order.id,
    totalAmount: order.total ?? order.totalAmount ?? items.reduce((total, item) => total + item.price * item.qty, 0),
    expectedDeliveryAt: order.expectedDeliveryAt || order.expectedDelivery,
    items,
  };
}

function TrackingPanel({ order }) {
  const currentStep = statusIndex(order.status);
  const address = order.deliveryAddress || {};
  const destination = getDestination(order);
  const currentLocation = order.currentLocation || TRACKING_STEPS[currentStep][1];

  return <div className="my-order-tracking">
    <div className="my-order-tracking-heading"><div><span className="orders-eyebrow">TRACKING {order.trackingNumber || order._id}</span><h3>{order.status === 'delivered' ? 'Delivered successfully' : `Your product is currently in ${currentLocation}`}</h3></div><span className="orders-arrival">Expected delivery: {formatDate(order.expectedDeliveryAt)}</span></div>
    {order.status === 'cancelled' ? <p className="orders-cancelled">This order was cancelled.</p> : <>
      <div className="orders-progress" role="progressbar" aria-valuemin="0" aria-valuemax="5" aria-valuenow={currentStep} aria-label={`Order status: ${TRACKING_STEPS[currentStep][1]}`}><span style={{ width: `${currentStep * 20}%` }} /></div>
      <ol className="orders-steps">{TRACKING_STEPS.map(([status, label], index) => <li className={`${index <= currentStep ? 'complete' : ''} ${index === currentStep ? 'current' : ''}`} key={status}><span>{index < currentStep ? '✓' : index + 1}</span><small>{label}</small></li>)}</ol>
    </>}
    <div className="orders-route"><article><span>⌖</span><div><small>CURRENT LOCATION</small><strong>{currentLocation}</strong></div></article><b aria-hidden="true">······→</b><article><span>⌂</span><div><small>DESTINATION</small><strong>{destination}</strong></div></article></div>
    {(address.name || address.phone) && <p className="orders-address-detail">{address.name}{address.phone ? ` · ${address.phone}` : ''}{address.house || address.street ? <><br />{[address.house, address.street].filter(Boolean).join(', ')}</> : null}</p>}
  </div>;
}

export default function Orders() {
  const { user } = useAuth();
  const [remoteOrders, setRemoteOrders] = useState([]);
  const [guestOrders, setGuestOrders] = useState(readGuestOrders);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(Boolean(user));
  const [expandedProduct, setExpandedProduct] = useState('');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return undefined;
    }
    let active = true;
    api.get('/orders').then(({ data }) => {
      if (active) setRemoteOrders(data.orders || []);
    }).catch(() => {
      if (active) setError('Your account orders are unavailable right now. Saved guest orders are still shown below.');
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [user]);

  useEffect(() => {
    const refresh = () => setGuestOrders(readGuestOrders());
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, []);

  const orders = useMemo(() => {
    const remoteIds = new Set(remoteOrders.map((order) => String(order._id)));
    const local = guestOrders.map(normalizeGuestOrder).filter((order) => !remoteIds.has(String(order._id)));
    return [...remoteOrders, ...local].sort((first, second) => new Date(second.createdAt || second.expectedDeliveryAt) - new Date(first.createdAt || first.expectedDeliveryAt));
  }, [remoteOrders, guestOrders]);

  if (loading) return <section className="my-orders-page"><div className="orders-loading">Loading your orders…</div></section>;

  return <section className="my-orders-page">
    <header className="my-orders-hero"><div><span className="orders-eyebrow">YOUR LUMORA ACCOUNT</span><h1>My Orders</h1><p>Every order, from checkout to your doorstep.</p></div><div className="orders-count"><strong>{orders.length}</strong><span>{orders.length === 1 ? 'order' : 'orders'}</span></div></header>
    {error && <p className="orders-message">{error}</p>}
    {orders.length ? <div className="my-orders-list">{orders.map((order) => <article className="my-order-card" key={order._id}>
      <header className="my-order-card-header"><div><span className="orders-eyebrow">ORDER ID</span><strong>{order._id}</strong><small>{formatDate(order.createdAt)} · {order.items.length} product{order.items.length === 1 ? '' : 's'}</small></div><div className="my-order-header-total"><span className={`orders-status orders-status-${order.status}`}>{order.status === 'pending' ? 'Order Placed' : order.status.replace(/-/g, ' ')}</span><strong>{money(order.totalAmount)}</strong></div></header>
      <div className="my-order-product-list">{order.items.map((item, index) => {
        const product = item.product || {};
        const key = `${order._id}-${index}`;
        const isExpanded = expandedProduct === key;
        return <div className="my-order-product" key={key}>
          <div className="my-order-product-row"><img src={product.imageUrl || product.images?.[0] || fallbackImage} alt={product.name || 'Ordered product'} /><div className="my-order-product-copy"><span>{product.brand || product.category || 'LUMORA'}</span><strong>{product.name || 'Ordered product'}</strong><small>Qty {item.qty} · {money(item.price || product.price)} each</small></div><strong className="my-order-line-total">{money((item.price || product.price || 0) * item.qty)}</strong><button className="my-order-track-button" aria-expanded={isExpanded} onClick={() => setExpandedProduct(isExpanded ? '' : key)}>{isExpanded ? 'Hide tracking' : 'Track Order'}</button></div>
          {isExpanded && <TrackingPanel order={order} />}
        </div>;
      })}</div>
      <footer className="my-order-card-footer"><div><span>DELIVERING TO</span><strong>{getDestination(order)}</strong></div><div><span>EXPECTED DELIVERY</span><strong>{formatDate(order.expectedDeliveryAt)}</strong></div><div><span>TRACKING NUMBER</span><strong>{order.trackingNumber || 'Tracking assigned after dispatch'}</strong></div></footer>
    </article>)}</div> : <div className="orders-empty"><span>✧</span><h2>Your order history will appear here.</h2><p>Once you place an order, you can follow every step of its journey.</p><Link to="/fashion">Explore the store</Link><Link to="/track-order">Track an order</Link></div>}
  </section>;
}