import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import api from '../services/api.js';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85';

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data)).catch(() => setError('Product not found.'));
  }, [id]);

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  }

  if (error) return <section className="content-page"><div className="state-panel">{error}<Link to="/products">Back to products</Link></div></section>;
  if (!product) return <div className="state-panel">Loading product...</div>;

  async function addToCart() {
    try { await addItem(product._id, qty); setError('Added to your cart.'); } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to add this item.'); }
  }

  return <section className="detail-page"><Link className="back-link" to="/products">← All products</Link><div className="detail-layout"><div className="detail-image"><img src={product.imageUrl || product.images?.[0] || FALLBACK_IMAGE} alt={product.name} onError={handleImageError} /></div><div className="detail-copy"><p className="product-category">{product.category || 'Essential'}</p><h1>{product.name}</h1><p className="detail-description">{product.description || 'A considered addition to your everyday.'}</p><strong className="detail-price">₹{Number(product.price || 0).toLocaleString('en-IN')}</strong><p className="stock-note">{product.stock ? `${product.stock} available` : 'Currently unavailable'}</p>{user && <div className="purchase-row"><input type="number" min="1" max={product.stock} value={qty} onChange={(event) => setQty(Number(event.target.value))} /><button className="button" disabled={!product.stock} onClick={addToCart}>Add to cart</button></div>}{error && <p className="form-error">{error}</p>}</div></div></section>;
}
