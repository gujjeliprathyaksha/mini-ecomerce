import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api.js';
import { departments, slugify } from '../data/departments.js';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85';

export default function TaxonomyProducts() {
  const { department: departmentKey, category: categoryKey, subcategory: subcategoryKey } = useParams();
  const department = departments[departmentKey];
  const categoryEntry = department?.categories[categoryKey];
  const category = categoryEntry?.[0];
  const exactSubcategory = subcategoryKey ? categoryEntry?.[1].find((item) => slugify(item) === subcategoryKey) : undefined;
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!department || !category) return;
    setStatus('loading');
    const params = { department: department.department, category };
    if (exactSubcategory) params.subcategory = exactSubcategory;
    api.get('/products', { params: { ...params, limit: 100 } }).then(({ data }) => { setProducts(data.products || []); setStatus('ready'); }).catch(() => setStatus('error'));
  }, [department, category, exactSubcategory]);

  const visible = useMemo(() => {
    const filtered = products.filter((product) => `${product.name} ${product.category || ''} ${product.subcategory || ''}`.toLowerCase().includes(query.toLowerCase()));
    return [...filtered].sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : (b.rating || 0) - (a.rating || 0));
  }, [products, query, sort]);

  if (!department || !categoryEntry) return <section className="content-page"><div className="state-panel">That collection does not exist.<Link to="/categories.html">Browse categories</Link></div></section>;
  const title = exactSubcategory || category;
  return <section className="content-page"><div className="page-heading"><div><Link className="back-link" to={`/browse/${departmentKey}`}>LUMORA / {department.title}</Link><p className="eyebrow">Exact category edit</p><h1>{title}</h1><p>Only {title.toLowerCase()} from {department.department} are shown here.</p></div></div><div className="filters"><input aria-label="Search this collection" placeholder={`Search ${title}`} value={query} onChange={(event) => setQuery(event.target.value)} /><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>{status === 'loading' && <div className="state-panel">Loading {title.toLowerCase()}...</div>}{status === 'error' && <div className="state-panel">Unable to load this collection. <button className="button" onClick={() => window.location.reload()}>Retry</button></div>}{status === 'ready' && !visible.length && <div className="state-panel">No {title.toLowerCase()} found yet. Try another category.</div>}{status === 'ready' && visible.length > 0 && <div className="product-grid">{visible.map((product) => <article className="product-card" key={product._id}><Link to={`/products/${product._id}`}><div className="product-image"><img src={product.imageUrl || product.images?.[0] || FALLBACK_IMAGE} alt={product.name} loading="lazy" onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = FALLBACK_IMAGE;
        }} /><span className="product-tag">{product.discount ? `${product.discount}% OFF` : 'NEW'}</span></div></Link><div className="product-body"><span className="category-label">{product.brand || product.subcategory || product.category}</span><h3>{product.name}</h3><p>{product.description}</p><div className="product-rating">★★★★★ <span>{product.rating || '4.8'}</span></div><div className="price-row"><strong>₹{Number(product.price || 0).toLocaleString('en-IN')}</strong>{product.originalPrice ? <del>₹{Number(product.originalPrice).toLocaleString('en-IN')}</del> : null}</div><Link className="button primary" to={`/products/${product._id}`}>View details</Link></div></article>)}</div>}</section>;
}
