import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { readBeautyWishlist, toggleWishlistProduct } from '../data/beautyWishlist.js';
import { useEffect, useState } from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [wished, setWished] = useState(() => readBeautyWishlist().some((item) => String(item._id || item.id) === String(product._id || product.id)));
  const isRemoteProduct = /^[a-f\d]{24}$/i.test(product._id || '');

  async function handleAdd() {
    await addItem(product._id, 1, product);
  }

  function toggleWishlist() {
    const wishlistProduct = { ...product, slug: product.slug || product.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
    const { next, exists } = toggleWishlistProduct(wishlistProduct);
    setWished(!exists);
    window.dispatchEvent(new CustomEvent('wishlist-feedback', { detail: exists ? 'Product removed from Wishlist' : 'Product added to Wishlist ❤️' }));
  }

  useEffect(() => {
    const refresh = () => setWished(readBeautyWishlist().some((item) => String(item._id || item.id) === String(product._id || product.id)));
    window.addEventListener('beauty-wishlist-change', refresh);
    return () => window.removeEventListener('beauty-wishlist-change', refresh);
  }, [product._id, product.id]);

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  }

  return (
    <article className="product-card">
      {isRemoteProduct ? <Link to={`/products/${product._id}`} className="product-image-link">
        <img
          src={product.imageUrl || product.images?.[0] || FALLBACK_IMAGE}
          alt={product.name}
          loading="lazy"
          onError={handleImageError}
        />
      </Link> : <div className="product-image-link">
        <img src={product.imageUrl || product.images?.[0] || FALLBACK_IMAGE} alt={product.name} loading="lazy" onError={handleImageError} />
      </div>}
      <div className="product-card-body">
        <button className={`shop-heart product-card-heart ${wished ? 'active' : ''}`} type="button" aria-label={`${wished ? 'Remove from' : 'Add to'} wishlist: ${product.name}`} onClick={toggleWishlist}>{wished ? '♥' : '♡'}</button>
        <p className="product-category">{product.category || 'Essential'}</p>
        {isRemoteProduct ? <Link to={`/products/${product._id}`} className="product-name">{product.name}</Link> : <span className="product-name">{product.name}</span>}
        <div className="product-card-footer">
          <strong>₹{Number(product.price || 0).toLocaleString('en-IN')}</strong>
          <button className="button button-small" onClick={handleAdd} disabled={isRemoteProduct && !product.stock}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}
