import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { beautyCategories, beautyProducts, findBeautyCategory, findBeautySubcategory, getBeautyProductRoute } from '../data/beautyCatalog.js';
import { readBeautyWishlist as readWishlist, saveBeautyWishlist as saveWishlist, toggleWishlistProduct } from '../data/beautyWishlist.js';
import api from '../services/api.js';

const money = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;
const productKey = (product) => String(product._id || product.id || product.slug);
const productSlug = (product) => product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const subcategoryPath = (subcategory) => subcategory === 'Face Serum' ? 'serums' : subcategory === 'Perfumes' ? 'perfumes' : subcategory.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function BeautyProductCard({ product, wished, toggleWishlist, onAdd, onBuy }) {
  const discount = product.discount || Math.round((1 - product.price / (product.originalPrice || product.price)) * 100);
  return <article className="beauty-product-card">
    <div className="beauty-product-image"><Link to={getBeautyProductRoute(product)}><img src={product.imageUrl || product.images?.[0]} alt={product.name} loading="lazy" /></Link><span className="beauty-discount">{discount}% off</span><button className={`beauty-heart ${wished ? 'is-wished' : ''}`} type="button" onClick={() => toggleWishlist(product)} aria-label={`${wished ? 'Remove from' : 'Add to'} wishlist: ${product.name}`}>{wished ? '♥' : '♡'}</button></div>
    <div className="beauty-product-copy"><span className="beauty-brand">{product.brand}</span><Link className="beauty-product-name" to={getBeautyProductRoute(product)}>{product.name}</Link><div className="beauty-rating"><span>★</span> {Number(product.rating || 0).toFixed(1)} <small>({product.reviews || 0})</small></div><div className="beauty-price"><strong>{money(product.price)}</strong><del>{money(product.originalPrice || product.price)}</del></div><small className={`beauty-stock ${product.stock > 0 ? '' : 'out-of-stock'}`}>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}{product.colors?.[0] ? ` · ${product.colors[0]}` : ''}</small><div className="beauty-card-actions"><button type="button" className="beauty-add" disabled={!product.stock} onClick={() => onAdd(product)}>Add to cart</button><button type="button" className="beauty-buy" disabled={!product.stock} onClick={() => onBuy(product)}>Buy now</button></div></div>
  </article>;
}

function ProductGrid({ items, wishlist, toggleWishlist, addToCart, buyNow }) {
  if (!items.length) return <div className="beauty-empty">No products match these filters. Try changing your search or selections.</div>;
  return <div className="beauty-product-grid">{items.map((product) => <BeautyProductCard key={productKey(product)} product={product} wished={wishlist.some((item) => productKey(item) === productKey(product))} toggleWishlist={toggleWishlist} onAdd={addToCart} onBuy={buyNow} />)}</div>;
}

function BeautyCatalog() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [products, setProducts] = useState(beautyProducts);
  const [wishlist, setWishlist] = useState(readWishlist);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [brand, setBrand] = useState('');
  const [priceBand, setPriceBand] = useState('');
  const [rating, setRating] = useState('');
  const [discount, setDiscount] = useState('');
  const [availability, setAvailability] = useState('');
  const [notice, setNotice] = useState('');
  const segments = location.pathname.split('/').filter(Boolean);
  const category = segments[1] ? findBeautyCategory(segments[1]) : null;
  const subcategory = category && segments[2] ? findBeautySubcategory(category, segments[2]) : undefined;
  const isLanding = segments.length === 1;

  useEffect(() => {
    let active = true;
    api.get('/products', { params: { department: 'Beauty', limit: 100 } }).then(({ data }) => {
      if (!active) return;
      const valid = (data.products || []).filter((product) => beautyCategories.some((entry) => entry.name === product.category && entry.subcategories.includes(product.subcategory)));
      if (valid.length) setProducts(valid);
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const refresh = () => setWishlist(readWishlist());
    window.addEventListener('beauty-wishlist-change', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('beauty-wishlist-change', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  useEffect(() => {
    setQuery('');
    setBrand('');
    setPriceBand('');
    setRating('');
    setDiscount('');
    setAvailability('');
  }, [location.pathname]);

  const scopedProducts = useMemo(() => products.filter((product) => {
    if (category && product.category !== category.name) return false;
    if (subcategory && product.subcategory !== subcategory) return false;
    const searchText = `${product.name} ${product.brand} ${product.description} ${product.category} ${product.subcategory}`.toLowerCase();
    if (query.trim() && !searchText.includes(query.trim().toLowerCase())) return false;
    if (brand && product.brand !== brand) return false;
    if (rating && Number(product.rating || 0) < Number(rating)) return false;
    if (discount && Number(product.discount || 0) < Number(discount)) return false;
    if (availability === 'in-stock' && product.stock <= 0) return false;
    if (availability === 'out-of-stock' && product.stock > 0) return false;
    if (priceBand) {
      const [min, max] = priceBand.split('-').map(Number);
      if (product.price < min || (max && product.price > max)) return false;
    }
    return true;
  }).sort((first, second) => sort === 'price-low' ? first.price - second.price : sort === 'price-high' ? second.price - first.price : sort === 'rating' ? second.rating - first.rating : sort === 'discount' ? second.discount - first.discount : 0), [products, category, subcategory, query, sort, brand, priceBand, rating, discount, availability]);

  function toggleWishlist(product) {
    const { next, exists } = toggleWishlistProduct(product);
    setWishlist(next);
    setNotice(exists ? 'Product removed from Wishlist' : 'Product added to Wishlist ❤️');
    window.setTimeout(() => setNotice(''), 1800);
  }

  async function addToCart(product) {
    await addItem(product._id || product.id, 1, product);
    setNotice(`${product.name} added to your cart`);
    window.setTimeout(() => setNotice(''), 1800);
  }

  async function buyNow(product) {
    await addItem(product._id || product.id, 1, product);
    navigate('/shopping-cart');
  }

  const visibleBrands = [...new Set(products.filter((product) => !category || product.category === category.name).map((product) => product.brand).filter(Boolean))].sort();
  const linkedCategories = <div className="beauty-category-grid">{beautyCategories.map((entry) => <Link className="beauty-category-card" to={`/beauty/${entry.slug}`} key={entry.slug}><img src={entry.image} alt={entry.name} loading="lazy" /><span>{entry.name}</span><small>{entry.subcategories.length} edits <b>↗</b></small></Link>)}</div>;
  const subcategoryLinks = category && <nav className="beauty-subcategory-nav" aria-label={`${category.name} subcategories`}><Link className={!subcategory ? 'active' : ''} to={`/beauty/${category.slug}`}>All {category.name}</Link>{category.subcategories.map((item) => <Link className={subcategory === item ? 'active' : ''} key={item} to={`/beauty/${category.slug}/${subcategoryPath(item)}`}>{item}</Link>)}</nav>;
  const bestSellers = [...products].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 4);
  const arrivals = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  const offers = [...products].sort((a, b) => b.discount - a.discount).slice(0, 4);

  return <section className="beauty-page">
    {notice && <div className="beauty-toast" role="status">{notice}</div>}
    <div className="beauty-topline"><span>THE LUMORA BEAUTY EDIT</span><div><Link to="/beauty/wishlist">Wishlist <b>{wishlist.length}</b></Link>{user?.role === 'admin' && <Link to="/beauty/admin">Manage products</Link>}</div></div>
    {isLanding ? <>
      <section className="beauty-hero"><div className="beauty-hero-copy"><p className="beauty-kicker">Care, color, and little rituals</p><h1>Your beauty,<br /><em>your everyday.</em></h1><p>Thoughtful essentials for skin, hair, scent and everything in between.</p><Link className="beauty-cta" to="#beauty-shop">Shop Beauty Essentials <span>↗</span></Link></div><div className="beauty-hero-image"><img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1300&q=90" alt="A curated arrangement of beauty products" /><span>THE DAILY RITUAL<br /><b>Find your feel-good.</b></span></div></section>
      <section className="beauty-brand-band"><span>BEAUTY BRANDS WE LOVE</span>{['Serein Skin', 'Morrow Beauty', 'Root Ritual', 'Maison Serein', 'Form & Finish'].map((name) => <b key={name}>{name}</b>)}</section>
      <section className="beauty-section" id="beauty-shop"><div className="beauty-section-heading"><div><span className="beauty-kicker">Explore the edit</span><h2>Shop by category</h2></div><Link to="/beauty/skincare">Discover Beauty <span>↗</span></Link></div>{linkedCategories}</section>
      <section className="beauty-section beauty-section-tinted"><div className="beauty-section-heading"><div><span className="beauty-kicker">Loved by you</span><h2>Beauty best sellers</h2></div><Link to="/beauty/makeup">Shop all <span>↗</span></Link></div><ProductGrid items={bestSellers} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} buyNow={buyNow} /></section>
      <section className="beauty-feature-bands"><Link to="/beauty/skincare/serums"><img src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85" alt="Serum bottles" /><span><small>THE SKIN RESET</small><strong>Start with a little glow.</strong><b>Explore serums ↗</b></span></Link><Link to="/beauty/fragrance/perfumes"><img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85" alt="Perfume bottles" /><span><small>SCENT NOTES</small><strong>Find your signature.</strong><b>Shop fragrance ↗</b></span></Link></section>
      <section className="beauty-section"><div className="beauty-section-heading"><div><span className="beauty-kicker">Just arrived</span><h2>New to the shelf</h2></div><Link to="/beauty/hair-care">Explore new arrivals <span>↗</span></Link></div><ProductGrid items={arrivals} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} buyNow={buyNow} /></section>
      <section className="beauty-offer-strip"><span>THE BEAUTY FINDS</span><strong>Little rituals, softer prices.</strong><Link to="/beauty?offers=true">Shop offers <b>↗</b></Link></section>
      <section className="beauty-section"><div className="beauty-section-heading"><div><span className="beauty-kicker">Trending now</span><h2>In the routine</h2></div><Link to="/beauty">View all <span>↗</span></Link></div><ProductGrid items={offers} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} buyNow={buyNow} /></section>
      <section className="beauty-section beauty-all-products" id="beauty-all-products"><div className="beauty-section-heading"><div><span className="beauty-kicker">The complete edit</span><h2>Shop Beauty Essentials</h2></div><span>{scopedProducts.length} products</span></div><div className="beauty-toolbar"><input aria-label="Search all Beauty products" type="search" placeholder="Search lipstick, face serum, shampoo..." value={query} onChange={(event) => setQuery(event.target.value)} /><select aria-label="Filter Beauty category" value="" onChange={(event) => event.target.value && navigate(`/beauty/${event.target.value}`)}><option value="">All categories</option>{beautyCategories.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name}</option>)}</select><select aria-label="Brand" value={brand} onChange={(event) => setBrand(event.target.value)}><option value="">All brands</option>{visibleBrands.map((name) => <option key={name}>{name}</option>)}</select><select aria-label="Price range" value={priceBand} onChange={(event) => setPriceBand(event.target.value)}><option value="">Any price</option><option value="0-298">Under ₹299</option><option value="299-499">₹299–₹499</option><option value="499-999">₹499–₹999</option><option value="1000-1999">₹999–₹1,999</option><option value="2000-0">Above ₹2,000</option></select><select aria-label="Minimum rating" value={rating} onChange={(event) => setRating(event.target.value)}><option value="">Any rating</option><option value="4">4★ & above</option><option value="3">3★ & above</option></select><select aria-label="Minimum discount" value={discount} onChange={(event) => setDiscount(event.target.value)}><option value="">Any discount</option><option value="10">10%+</option><option value="20">20%+</option><option value="30">30%+</option><option value="50">50%+</option></select><select aria-label="Availability" value={availability} onChange={(event) => setAvailability(event.target.value)}><option value="">Any availability</option><option value="in-stock">In Stock</option><option value="out-of-stock">Out of Stock</option></select><select aria-label="Sort all Beauty products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option><option value="discount">Biggest discount</option></select></div><ProductGrid items={scopedProducts} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} buyNow={buyNow} /></section>
    </> : category ? <>
      <header className="beauty-category-hero"><div><Link className="beauty-breadcrumb" to="/beauty">Beauty /</Link><p className="beauty-kicker">The Beauty Department</p><h1>{subcategory || category.name}</h1><p>{subcategory ? `Shop our ${subcategory.toLowerCase()} edit, selected for your everyday routine.` : category.description}</p></div><img src={category.image} alt={category.name} /></header>
      {subcategoryLinks}
      <section className="beauty-listing-section"><div className="beauty-listing-heading"><div><span className="beauty-kicker">{category.name}{subcategory ? ` / ${subcategory}` : ''}</span><h2>{scopedProducts.length} considered essentials</h2></div><Link to="/beauty">All Beauty</Link></div><div className="beauty-toolbar"><select aria-label="Filter Beauty category" value={category.slug} onChange={(event) => navigate(`/beauty/${event.target.value}`)}>{beautyCategories.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name}</option>)}</select><input aria-label="Search Beauty products" type="search" placeholder={`Search ${subcategory || category.name}`} value={query} onChange={(event) => setQuery(event.target.value)} /><select aria-label="Brand" value={brand} onChange={(event) => setBrand(event.target.value)}><option value="">All brands</option>{visibleBrands.map((name) => <option key={name}>{name}</option>)}</select><select aria-label="Price range" value={priceBand} onChange={(event) => setPriceBand(event.target.value)}><option value="">Any price</option><option value="0-298">Under ₹299</option><option value="299-499">₹299–₹499</option><option value="499-999">₹499–₹999</option><option value="1000-1999">₹999–₹1,999</option><option value="2000-0">Above ₹2,000</option></select><select aria-label="Minimum rating" value={rating} onChange={(event) => setRating(event.target.value)}><option value="">Any rating</option><option value="4">4★ & above</option><option value="3">3★ & above</option></select><select aria-label="Minimum discount" value={discount} onChange={(event) => setDiscount(event.target.value)}><option value="">Any discount</option><option value="10">10%+</option><option value="20">20%+</option><option value="30">30%+</option><option value="50">50%+</option></select><select aria-label="Availability" value={availability} onChange={(event) => setAvailability(event.target.value)}><option value="">Any availability</option><option value="in-stock">In Stock</option><option value="out-of-stock">Out of Stock</option></select><select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option><option value="discount">Biggest discount</option></select></div><ProductGrid items={scopedProducts} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} buyNow={buyNow} /></section>
    </> : <section className="beauty-not-found"><h1>That Beauty edit isn't here.</h1><Link className="beauty-cta" to="/beauty">Back to Beauty</Link></section>}
  </section>;
}

function BeautyProductDetail({ slug }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(beautyProducts.find((item) => productSlug(item) === slug));
  const [wishlist, setWishlist] = useState(readWishlist);
  useEffect(() => {
    if (product) return;
    api.get('/products', { params: { department: 'Beauty', limit: 100 } }).then(({ data }) => setProduct((data.products || []).find((item) => productSlug(item) === slug) || null)).catch(() => setProduct(null));
  }, [product, slug]);
  function toggleWishlist() {
    const current = readWishlist();
    const next = current.some((item) => productKey(item) === productKey(product)) ? current.filter((item) => productKey(item) !== productKey(product)) : [...current, product];
    saveWishlist(next);
    setWishlist(next);
  }
  if (!product) return <section className="beauty-not-found"><h1>Product not found.</h1><Link to="/beauty">Return to Beauty</Link></section>;
  const images = product.images?.length ? product.images : [product.imageUrl];
  return <section className="beauty-detail-page"><Link className="beauty-breadcrumb" to={`/beauty/${beautyCategories.find((item) => item.name === product.category)?.slug || 'skincare'}`}>Beauty / {product.category}</Link><div className="beauty-detail-layout"><div className="beauty-detail-gallery">{images.map((src) => <img key={src} src={src} alt={product.name} />)}</div><div className="beauty-detail-copy"><p className="beauty-kicker">{product.brand} · {product.subcategory}</p><h1>{product.name}</h1><div className="beauty-rating"><span>★</span> {Number(product.rating || 0).toFixed(1)} <small>({product.reviews || 0} reviews)</small></div><p>{product.description}</p><div className="beauty-detail-price"><strong>{money(product.price)}</strong><del>{money(product.originalPrice || product.price)}</del><span>{product.discount}% off</span></div><p className={`beauty-stock ${product.stock > 0 ? '' : 'out-of-stock'}`}>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>{product.colors?.length > 0 && <p className="beauty-variants">Variant: {product.colors.join(' · ')}</p>}<div className="beauty-detail-actions"><button className="beauty-add" disabled={!product.stock} onClick={() => addItem(product._id || product.id, 1, product)}>Add to cart</button><button className="beauty-buy" disabled={!product.stock} onClick={async () => { await addItem(product._id || product.id, 1, product); navigate('/shopping-cart'); }}>Buy now</button><button className="beauty-heart detail-heart" aria-label="Toggle wishlist" onClick={toggleWishlist}>{wishlist.some((item) => productKey(item) === productKey(product)) ? '♥' : '♡'}</button></div><dl className="beauty-specs"><div><dt>Category</dt><dd>{product.category} / {product.subcategory}</dd></div><div><dt>Brand</dt><dd>{product.brand}</dd></div><div><dt>Delivery</dt><dd>Complimentary delivery on every order</dd></div>{Object.entries(product.specifications || {}).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{String(value)}</dd></div>)}</dl></div></div></section>;
}

function BeautyWishlist() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [items, setItems] = useState(readWishlist);
  function update(next) {
    saveWishlist(next);
    setItems(next);
  }
  return <section className="beauty-listing-section beauty-wishlist-page"><div className="beauty-listing-heading"><div><span className="beauty-kicker">YOUR SAVED EDIT</span><h1>My Beauty Wishlist</h1></div><Link to="/beauty">Continue browsing</Link></div>{items.length ? <div className="beauty-product-grid">{items.map((product) => <article className="beauty-product-card" key={productKey(product)}><Link className="wishlist-image" to={getBeautyProductRoute(product)}><img src={product.imageUrl || product.images?.[0]} alt={product.name} /></Link><div className="beauty-product-copy"><span className="beauty-brand">{product.brand}</span><Link className="beauty-product-name" to={getBeautyProductRoute(product)}>{product.name}</Link><div className="beauty-rating"><span>★</span> {Number(product.rating || 0).toFixed(1)} <small>({product.reviews || 0})</small></div><div className="beauty-price"><strong>{money(product.price)}</strong><del>{money(product.originalPrice || product.price)}</del><span>{product.discount}% off</span></div><div className="beauty-card-actions"><button className="beauty-add" onClick={async () => { await addItem(product._id || product.id, 1, product); navigate('/shopping-cart'); }}>Add to cart</button><button className="beauty-buy" onClick={() => update(items.filter((item) => productKey(item) !== productKey(product)))}>Remove</button></div></div></article>)}</div> : <div className="beauty-empty">Your Wishlist is Empty. <Link to="/beauty">Explore Beauty</Link></div>}</section>;
}

function BeautyAdmin() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState('');
  const blank = { name: '', brand: '', category: 'Skincare', subcategory: 'Face Wash', description: '', price: '', originalPrice: '', stock: '', rating: '4.5', reviews: '0', discount: '', images: '', colors: '', specifications: '' };
  const [form, setForm] = useState(blank);
  async function loadProducts() {
    try {
      const { data } = await api.get('/products', { params: { department: 'Beauty', limit: 100 } });
      setProducts((data.products || []).filter((product) => product.department === 'Beauty'));
      setError('');
    } catch {
      setError('Admin product management requires the API and database to be available.');
    }
  }
  useEffect(() => { loadProducts(); }, []);
  if (user?.role !== 'admin') return <section className="beauty-not-found"><h1>Admin access required.</h1><Link to="/beauty">Return to Beauty</Link></section>;
  const category = beautyCategories.find((item) => item.name === form.category);
  function startEdit(product) {
    setEditing(product._id);
    setForm({ ...blank, ...product, price: String(product.price), originalPrice: String(product.originalPrice || ''), stock: String(product.stock), rating: String(product.rating || 0), reviews: String(product.reviews || 0), discount: String(product.discount || ''), images: (product.images || []).join('\n'), colors: (product.colors || []).join(', '), specifications: JSON.stringify(product.specifications || {}, null, 2) });
  }
  async function submit(event) {
    event.preventDefault();
    const imageUrls = form.images.split(/[\n,]+/).map((url) => url.trim()).filter(Boolean);
    const payload = { ...form, department: 'Beauty', price: Number(form.price), originalPrice: Number(form.originalPrice || form.price), discount: Number(form.discount || 0), stock: Number(form.stock), rating: Number(form.rating), reviews: Number(form.reviews), images: imageUrls, imageUrl: imageUrls[0] || '', colors: form.colors.split(',').map((color) => color.trim()).filter(Boolean), specifications: JSON.parse(form.specifications || '{}') };
    try {
      await (editing ? api.put(`/products/${editing}`, payload) : api.post('/products', payload));
      setForm(blank);
      setEditing('');
      await loadProducts();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not save the product. Check admin permissions and product details.');
    }
  }
  async function removeProduct(id) {
    try {
      await api.delete(`/products/${id}`);
      await loadProducts();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not delete this product.');
    }
  }
  return <section className="beauty-admin-page"><div className="beauty-listing-heading"><div><span className="beauty-kicker">ADMIN CATALOG</span><h1>Beauty products</h1></div><Link to="/beauty">View storefront</Link></div>{error && <p className="beauty-admin-error">{error}</p>}<div className="beauty-admin-layout"><form className="beauty-admin-form" onSubmit={submit}><h2>{editing ? 'Edit product' : 'Add a product'}</h2><label>Product name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>Brand<input required value={form.brand} onChange={(event) => setForm({ ...form, brand: event.target.value })} /></label><div className="beauty-admin-fields"><label>Category<select value={form.category} onChange={(event) => { const next = beautyCategories.find((item) => item.name === event.target.value); setForm({ ...form, category: next.name, subcategory: next.subcategories[0] }); }}>{beautyCategories.map((item) => <option key={item.name}>{item.name}</option>)}</select></label><label>Subcategory<select value={form.subcategory} onChange={(event) => setForm({ ...form, subcategory: event.target.value })}>{category?.subcategories.map((item) => <option key={item}>{item}</option>)}</select></label></div><label>Description<textarea rows="3" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label><div className="beauty-admin-fields"><label>Price<input type="number" min="0" required value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} /></label><label>Original price<input type="number" min="0" value={form.originalPrice} onChange={(event) => setForm({ ...form, originalPrice: event.target.value })} /></label><label>Discount %<input type="number" min="0" max="100" value={form.discount} onChange={(event) => setForm({ ...form, discount: event.target.value })} /></label><label>Stock<input type="number" min="0" required value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} /></label><label>Rating<input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(event) => setForm({ ...form, rating: event.target.value })} /></label><label>Reviews<input type="number" min="0" value={form.reviews} onChange={(event) => setForm({ ...form, reviews: event.target.value })} /></label></div><label>Image URLs, one per line<input required value={form.images} onChange={(event) => setForm({ ...form, images: event.target.value })} placeholder="https://..." /></label><label>Colors / variants<input value={form.colors} onChange={(event) => setForm({ ...form, colors: event.target.value })} placeholder="Rose, Clear" /></label><label>Specifications as JSON<textarea rows="3" value={form.specifications} onChange={(event) => setForm({ ...form, specifications: event.target.value })} /></label><div className="beauty-admin-form-actions"><button className="beauty-add" type="submit">{editing ? 'Save changes' : 'Add Beauty product'}</button>{editing && <button type="button" className="beauty-buy" onClick={() => { setEditing(''); setForm(blank); }}>Cancel</button>}</div></form><div className="beauty-admin-list"><h2>Catalog ({products.length})</h2>{products.map((product) => <article className="beauty-admin-row" key={product._id}><img src={product.imageUrl || product.images?.[0]} alt="" /><div><strong>{product.name}</strong><small>{product.category} / {product.subcategory} · {money(product.price)} · {product.stock} units</small></div><button onClick={() => startEdit(product)}>Edit</button><button onClick={() => removeProduct(product._id)}>Delete</button></article>)}</div></div></section>;
}

export default function BeautyPage() {
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean);
  if (path[1] === 'product' && path[2]) return <BeautyProductDetail slug={path[2]} />;
  if (path[1] === 'wishlist') return <BeautyWishlist />;
  if (path[1] === 'admin') return <BeautyAdmin />;
  return <BeautyCatalog />;
}