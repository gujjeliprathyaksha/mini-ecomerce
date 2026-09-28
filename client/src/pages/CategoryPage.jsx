import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api.js';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85';
const CATEGORY_LABELS = {
  sarees: 'Sarees',
  'women-wear': 'Womens Wear',
  women: 'Womens Wear',
  'mens-wear': 'Mens Wear',
  'mens-jeans': 'Mens Jeans',
  men: 'Mens Wear',
  'kurta-sets': 'Kurta Sets',
  'kids-wear': 'Kids Wear',
  kids: 'Kids Wear',
  electronics: 'Electronics',
};

function toCategoryTitle(rawCategory) {
  const label = rawCategory || 'products';
  return CATEGORY_LABELS[label] || label.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default function CategoryPage() {
  const { category: routeCategory } = useParams();
  const resolvedCategory = routeCategory || window.location.pathname.split('/').pop().replace('.html', '');
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('popular');
  const [status, setStatus] = useState('loading');
  const [wishlist, setWishlist] = useState([]);

  const categoryTitle = useMemo(() => toCategoryTitle(resolvedCategory), [resolvedCategory]);

  useEffect(() => {
    setStatus('loading');
    api.get('/products', { params: { category: categoryTitle, limit: 50 } })
      .then(({ data }) => {
        setProducts(data.products || []);
        setStatus('ready');
      })
      .catch(() => {
        setProducts([]);
        setStatus('error');
      });
  }, [categoryTitle]);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => `${product.name} ${product.category || ''}`.toLowerCase().includes(query.toLowerCase()));
    return [...filtered].sort((first, second) => {
      if (sort === 'low') return (first.price || 0) - (second.price || 0);
      if (sort === 'high') return (second.price || 0) - (first.price || 0);
      if (sort === 'newest') return Number(second.createdAt ? new Date(second.createdAt).getTime() : 0) - Number(first.createdAt ? new Date(first.createdAt).getTime() : 0);
      return Number(second.rating || 0) - Number(first.rating || 0);
    });
  }, [products, query, sort]);

  function toggleWishlist(id) {
    setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return <section className="category-page"><div className="category-hero"><div><Link className="back-link" to="/">LUMORA / Collection</Link><p className="eyebrow">The curated edit</p><h1>{categoryTitle}</h1><p>Only {categoryTitle.toLowerCase()} products are shown here.</p></div><div className="category-hero-orb">{categoryTitle.slice(0, 2).toUpperCase()}</div></div><div className="category-toolbar"><div className="category-controls"><label>Search <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${categoryTitle}`} /></label><label>Sort <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="popular">Popular</option><option value="newest">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div></div>{status === 'loading' && <div className="state-panel">Loading {categoryTitle.toLowerCase()}...</div>}{status === 'error' && <div className="state-panel">Unable to load this collection right now.</div>}{status === 'ready' && !visibleProducts.length && <div className="state-panel">No {categoryTitle.toLowerCase()} products found yet.</div>}{status === 'ready' && visibleProducts.length > 0 && <div className="category-products">{visibleProducts.map((product) => <article className="category-product" key={product._id}><div className="category-product-image"><img src={product.imageUrl || product.images?.[0] || FALLBACK_IMAGE} alt={product.name} loading="lazy" onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = FALLBACK_IMAGE;
        }} /><span className="product-tag">{product.discount ? `${product.discount}% OFF` : 'NEW'}</span><button className={`heart-button ${wishlist.includes(product._id) ? 'is-liked' : ''}`} onClick={() => toggleWishlist(product._id)} aria-label={`Wishlist ${product.name}`}>{wishlist.includes(product._id) ? '♥' : '♡'}</button></div><div className="category-product-copy"><span className="product-kicker">{product.category || categoryTitle}</span><h2>{product.name}</h2><div className="product-rating">★★★★★ <span>{product.rating || '4.8'}</span></div><div className="price-line"><strong>₹{Number(product.price || 0).toLocaleString('en-IN')}</strong>{product.originalPrice ? <del>₹{Number(product.originalPrice).toLocaleString('en-IN')}</del> : null}{product.discount ? <span>{product.discount}% OFF</span> : null}</div><Link className="button button-dark" to={`/products/${product._id}`}>View Details</Link></div></article>)}</div>}</section>;
}
