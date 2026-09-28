import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';

const HISTORY_KEY = 'lumora-order-history';
const steps = [
  ['pending', 'Order Placed'],
  ['packed', 'Packed'],
  ['shipped', 'Shipped'],
  ['in-transit', 'In Transit'],
  ['out-for-delivery', 'Out for Delivery'],
  ['delivered', 'Delivered'],
];

function readLocalOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const recent = JSON.parse(localStorage.getItem('lumora-beauty-last-order') || 'null');
    return recent && !orders.some((order) => order.orderId === recent.orderId) ? [...orders, recent] : orders;
  } catch {
    return [];
  }
}

function normalize(value) {
  return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

function formatDate(value) {
  if (!value) return 'Within 3–5 days';
  return new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function daysUntil(value) {
  if (!value) return null;
  return Math.max(1, Math.ceil((new Date(value).getTime() - Date.now()) / 86400000));
}

function statusIndex(status) {
  const index = steps.findIndex(([value]) => value === status);
  return index < 0 ? 0 : index;
}

function destinationText(order) {
  if (order.destination) return order.destination;
  const address = order.deliveryAddress || order.address || {};
  return [address.city, address.state, address.pincode].filter(Boolean).join(', ') || 'Destination confirmed at checkout';
}

function matchesLocation(order, location) {
  if (!location.trim()) return true;
  const address = order.deliveryAddress || order.address || {};
  const searchText = normalize([order.destination, address.house, address.street, address.line, address.city, address.state, address.pincode].filter(Boolean).join(' '));
  return searchText.includes(normalize(location));
}

function normalizeLocalOrder(order) {
  return {
    orderId: order.orderId || order.id,
    trackingNumber: order.trackingNumber || order.id,
    status: order.status || 'pending',
    currentLocation: order.currentLocation || 'Lumora Fulfillment Center',
    expectedDeliveryAt: order.expectedDeliveryAt || order.expectedDelivery,
    deliveryAddress: order.deliveryAddress || order.address,
    destination: order.destination,
    items: (order.items || []).map((item) => ({
      name: item.name || item.product?.name || 'Product',
      quantity: item.quantity || item.qty || 1,
    })),
  };
}

export default function TrackOrder() {
  const [identifier, setIdentifier] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function checkDelivery(event) {
    event.preventDefault();
    const lookup = identifier.trim();
    if (!lookup) {
      setError('Enter your order ID or tracking number.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    const localOrder = readLocalOrders().find((order) => [order.orderId, order.id, order.trackingNumber].some((value) => normalize(value) === normalize(lookup)));

    try {
      const order = localOrder
        ? normalizeLocalOrder(localOrder)
        : (await api.post('/orders/track', { identifier: lookup, location })).data;
      if (!matchesLocation(order, location)) {
        setError('That location does not match this order destination. Check the city, state or PIN code and try again.');
        return;
      }
      setResult(order);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'We could not find that order. Check the ID or tracking number and try again.');
    } finally {
      setLoading(false);
    }
  }

  const activeStep = result ? statusIndex(result.status) : -1;
  const days = result ? daysUntil(result.expectedDeliveryAt) : null;
  const arrivalMessage = result?.status === 'delivered'
    ? `Delivered on ${formatDate(result.expectedDeliveryAt)}`
    : days === null ? 'Your order will arrive in 3–5 days.'
      : days <= 5 ? `Your order will arrive in ${Math.max(1, days - 2)}–${days} days.`
        : `Your order is expected by ${formatDate(result.expectedDeliveryAt)}.`;

  return <section className="track-page">
    <section className="track-hero">
      <div className="track-hero-copy"><span className="track-eyebrow">LUMORA DELIVERY CARE</span><h1>Your order,<br /><em>every step of the way.</em></h1><p>Look up the latest journey of your order from our hands to your doorstep.</p></div>
      <div className="track-hero-art" aria-hidden="true"><span>✦</span><span>✧</span><div className="track-parcel">LUMORA<br /><b>ON ITS WAY</b></div></div>
    </section>

    <div className="track-content">
      <form className="track-form" onSubmit={checkDelivery}>
        <div><span className="track-eyebrow">ORDER LOOKUP</span><h2>Find your delivery</h2><p>Use the order ID or tracking number from your confirmation.</p></div>
        <label>Order ID or tracking number<input autoComplete="off" value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="e.g. LMR-2026-AB12CD or LMR-8F3A91B2C4D5" required /></label>
        <label>Delivery location<input autoComplete="postal-code" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City, state or PIN code" required /></label>
        {error && <p className="track-error" role="alert">{error}</p>}
        <button className="track-submit" type="submit" disabled={loading}>{loading ? 'Checking delivery…' : 'Check Delivery'} <span>→</span></button>
      </form>

      {result ? <section className="track-result" aria-live="polite">
        <div className="track-result-heading"><div><span className="track-eyebrow">TRACKING {result.trackingNumber}</span><h2>{arrivalMessage}</h2><p>Order {result.orderId}</p></div><span className="track-arrival-date">{formatDate(result.expectedDeliveryAt)}</span></div>
        {result.status === 'cancelled' ? <p className="track-cancelled">This order was cancelled.</p> : <>
          <div className="track-progress" role="progressbar" aria-valuemin="0" aria-valuemax="5" aria-valuenow={activeStep} aria-label={`Delivery status: ${steps[activeStep][1]}`}><span style={{ width: `${activeStep * 20}%` }} /></div>
          <ol className="track-steps">{steps.map(([status, label], index) => <li className={`${index <= activeStep ? 'complete' : ''} ${index === activeStep ? 'current' : ''}`} key={status}><span className="track-step-mark">{index < activeStep ? '✓' : index + 1}</span><span>{label}</span></li>)}</ol>
        </>}
        <div className="track-location-grid"><article><span className="track-location-icon">⌖</span><div><small>CURRENT LOCATION</small><strong>{result.currentLocation || steps[activeStep]?.[1]}</strong></div></article><article><span className="track-location-icon">⌂</span><div><small>DELIVERING TO</small><strong>{destinationText(result)}</strong></div></article></div>
        {result.items?.length > 0 && <div className="track-items"><h3>In this order</h3>{result.items.map((item, index) => <div key={`${item.name}-${index}`}><span>{item.name}</span><strong>Qty {item.quantity}</strong></div>)}</div>}
      </section> : <aside className="track-help"><span>✧</span><p>Have your order confirmation nearby. Tracking becomes available as soon as your order is placed.</p><Link to="/my-wishlist">Visit your saved items</Link></aside>}
    </div>
    <p className="track-support">Need a hand? <Link to="/contact.html">Contact our customer care team</Link></p>
  </section>;
}