import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { beautyCategories, beautyProducts, getBeautyProductRoute } from '../data/beautyCatalog.js';
import { readBeautyWishlist, toggleWishlistProduct } from '../data/beautyWishlist.js';
import { findShoppingProduct, getCategoryRoute, getDepartmentRoute, getGroupRoute, getShoppingProductRoute, getSubcategoryRoute, shoppingDepartments, shoppingProducts } from '../data/shoppingCatalog.js';
import api from '../services/api.js';

const allDepartments = [...shoppingDepartments, { slug: 'beauty', name: 'Beauty' }];
const baseProducts = [...shoppingProducts, ...beautyProducts];
const money = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;
const productKey = (product) => `${product.department}|${product.category}|${product.subcategory}|${product.name}`.toLowerCase();
const slugify = (value) => String(value || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function productRoute(product) {
  return product.department === 'Beauty' ? getBeautyProductRoute(product) : getShoppingProductRoute(product);
}

function ShopProductCard({ product, wished, onWishlist, onAdd, onBuy }) {
  const discount = Number(product.discount || 0);
  return <article className="shop-product-card"><div className="shop-product-image"><Link to={productRoute(product)}><img src={product.imageUrl || product.images?.[0]} alt={product.name} loading="lazy" /></Link><span className="shop-discount">{discount}% OFF</span><button className={`shop-heart ${wished ? 'active' : ''}`} type="button" onClick={() => onWishlist(product)} aria-label={`${wished ? 'Remove from' : 'Add to'} wishlist: ${product.name}`}>{wished ? '♥' : '♡'}</button></div><div className="shop-product-copy"><span className="shop-brand">{product.brand || product.specifications?.author || product.category}</span><Link className="shop-product-name" to={productRoute(product)}>{product.name}</Link><div className="shop-rating"><span>★</span> {Number(product.rating || 0).toFixed(1)} <small>({product.reviews || 0})</small></div>{product.ageGroup && <small className="shop-meta">Age {product.ageGroup}</small>}{product.specifications?.language && <small className="shop-meta">{product.specifications.author} · {product.specifications.language}</small>}<div className="shop-prices"><strong>{money(product.price)}</strong><del>{money(product.originalPrice || product.price)}</del><span>{discount}% off</span></div><small className={`shop-stock ${product.stock > 0 ? '' : 'empty'}`}>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</small><div className="shop-card-actions"><button className="shop-add" type="button" disabled={!product.stock} onClick={() => onAdd(product)}>Add to cart</button><button className="shop-buy" type="button" disabled={!product.stock} onClick={() => onBuy(product)}>Buy now</button></div></div></article>;
}

function ShopGrid({ products, wishlist, toggleWishlist, addToCart, buyNow }) {
  if (!products.length) return <div className="shop-empty">No products match this collection. Try another search or filter.</div>;
  return <div className="shop-products-grid">{products.map((product) => <ShopProductCard key={product._id || productKey(product)} product={product} wished={wishlist.some((item) => productKey(item) === productKey(product))} onWishlist={toggleWishlist} onAdd={addToCart} onBuy={buyNow} />)}</div>;
}

function resolveDepartmentPage(department, path) {
  if (!department) return {};
  const normalizedPath = `/${path.join('/')}`;
  const groupMatch = department.groups.find((entry) => entry.slug && getGroupRoute(department, entry) === normalizedPath);
  for (const departmentGroup of department.groups) {
    for (const entry of departmentGroup.categories) {
      if (getCategoryRoute(department, departmentGroup, entry) === normalizedPath) return { group: departmentGroup, category: entry };
      const matchedSubcategory = entry.subcategories.find((subcategory) => getSubcategoryRoute(department, departmentGroup, entry, subcategory) === normalizedPath);
      if (matchedSubcategory) return { group: departmentGroup, category: entry, subcategory: matchedSubcategory };
    }
  }
  return { group: groupMatch };
}

function DepartmentLanding({ department, activeGroup, activeCategory }) {
  const groups = activeGroup ? [] : department.groups.filter((item) => item.categories.length);
  const categories = activeGroup?.categories || [];
  const imageFor = (entry, index) => entry.images?.[index % Math.max(1, entry.images.length)] || shoppingProducts.find((product) => product.department === department.name)?.imageUrl;
  return <>
    <header className="shop-hero"><div><p className="shop-eyebrow">LUMORA / DEPARTMENT</p><h1>{activeCategory?.name || activeGroup?.name || department.name}</h1><p>{department.description}</p></div><img src={activeCategory ? imageFor(activeCategory, 0) : shoppingProducts.find((product) => product.department === department.name)?.imageUrl} alt={department.name} /></header>
    {groups.length > 0 && <section className="shop-taxonomy-section"><div className="shop-heading"><div><span className="shop-eyebrow">Browse the department</span><h2>Shop by collection</h2></div></div><div className="shop-taxonomy-grid">{groups.map((entry, index) => <Link className="shop-taxonomy-card" to={getGroupRoute(department, entry)} key={entry.slug || entry.name}><img src={imageFor(entry.categories[0], index)} alt={entry.name || department.name} loading="lazy" /><span>{entry.name || entry.categories[0]?.name}</span><small>{entry.categories.length} collections ↗</small></Link>)}</div></section>}
    {activeGroup && categories.length > 0 && <section className="shop-taxonomy-section"><div className="shop-heading"><div><span className="shop-eyebrow">{activeGroup.name || department.name}</span><h2>Explore categories</h2></div><Link to={getDepartmentRoute(department)}>All {department.name}</Link></div><div className="shop-subcategory-grid">{categories.map((entry, index) => <Link className="shop-subcategory-card" to={getCategoryRoute(department, activeGroup, entry)} key={entry.slug}><img src={imageFor(entry, index)} alt={entry.name} loading="lazy" /><span>{entry.name}</span><small>{entry.subcategories.length ? `${entry.subcategories.length} edits` : 'Shop collection'} ↗</small></Link>)}</div></section>}
    {activeCategory?.subcategories.length > 0 && <nav className="shop-subcategory-nav" aria-label={`${activeCategory.name} subcategories`}>{activeCategory.subcategories.map((subcategory) => <Link key={subcategory} to={getSubcategoryRoute(department, activeGroup, activeCategory, subcategory)}>{subcategory}</Link>)}</nav>}
  </>;
}

function CatalogWishlist({ products, onRemove, onAdd }) {
  const navigate = useNavigate();
  if (!products.length) return <div className="shop-empty">Your Wishlist is Empty. <Link to="/">Explore the store</Link></div>;
  return <div className="shop-products-grid">{products.map((product) => <article className="shop-product-card" key={productKey(product)}><Link className="shop-wishlist-image" to={productRoute(product)}><img src={product.imageUrl || product.images?.[0]} alt={product.name} /></Link><div className="shop-product-copy"><span className="shop-brand">{product.brand || product.category}</span><Link className="shop-product-name" to={productRoute(product)}>{product.name}</Link><div className="shop-rating"><span>★</span> {Number(product.rating || 0).toFixed(1)} <small>({product.reviews || 0})</small></div><div className="shop-prices"><strong>{money(product.price)}</strong><del>{money(product.originalPrice || product.price)}</del><span>{product.discount}% off</span></div><div className="shop-card-actions"><button className="shop-add" onClick={async () => { await onAdd(product); navigate('/shopping-cart'); }}>Add to cart</button><button className="shop-buy" onClick={() => onRemove(product)}>Remove</button></div></div></article>)}</div>;
}

function CatalogProductDetail({ slug, products, wishlist, toggleWishlist, addToCart, buyNow }) {
  const product = products.find((entry) => entry.slug === slug) || findShoppingProduct(slug);
  if (!product) return <div className="shop-empty">Product not found. <Link to="/">Back to shopping</Link></div>;
  return <section className="shop-detail"><Link className="shop-breadcrumb" to={product.listingRoute || `/${slugify(product.department)}`}>{product.department} / {product.category}</Link><div className="shop-detail-layout"><img src={product.imageUrl || product.images?.[0]} alt={product.name} /><div><span className="shop-brand">{product.brand || product.specifications?.author}</span><h1>{product.name}</h1><div className="shop-rating"><span>★</span> {Number(product.rating || 0).toFixed(1)} <small>({product.reviews || 0} reviews)</small></div><p>{product.description}</p><div className="shop-detail-price"><strong>{money(product.price)}</strong><del>{money(product.originalPrice || product.price)}</del><span>{product.discount}% off</span></div><p className={`shop-stock ${product.stock > 0 ? '' : 'empty'}`}>{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>{Object.entries(product.specifications || {}).map(([key, value]) => <p className="shop-detail-spec" key={key}><strong>{key.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)}:</strong> {String(value)}</p>)}<div className="shop-detail-actions"><button className="shop-add" disabled={!product.stock} onClick={() => addToCart(product)}>Add to cart</button><button className="shop-buy" disabled={!product.stock} onClick={() => buyNow(product)}>Buy now</button><button className="shop-detail-heart" aria-label="Toggle wishlist" onClick={() => toggleWishlist(product)}>{wishlist.some((item) => productKey(item) === productKey(product)) ? '♥' : '♡'}</button></div></div></div></section>;
}

export default function DepartmentShop() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [remoteProducts, setRemoteProducts] = useState([]);
  const [wishlist, setWishlist] = useState(readBeautyWishlist);
  const [query, setQuery] = useState(new URLSearchParams(location.search).get('q') || '');
  const [brand, setBrand] = useState('');
  const [priceBand, setPriceBand] = useState('');
  const [rating, setRating] = useState('');
  const [discount, setDiscount] = useState('');
  const [maximumDiscount, setMaximumDiscount] = useState('');
  const [availability, setAvailability] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [sort, setSort] = useState('featured');
  const [notice, setNotice] = useState('');
  const path = location.pathname.split('/').filter(Boolean);
  const isWishlist = path[0] === 'my-wishlist';
  const isDetail = path[0] === 'catalog' && path[1];
  const isSearch = path[0] === 'search';
  const isOffers = path[0] === 'offers';
  const isArrivals = path[0] === 'arrivals';
  const department = shoppingDepartments.find((entry) => entry.slug === path[0]);
  const pageInfo = department ? resolveDepartmentPage(department, path) : {};
  const currentPath = `/${path.join('/')}`;

  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get('q') || '');
  }, [location.search]);

  useEffect(() => {
    if (!department) return;
    let active = true;
    api.get('/products', { params: { department: department.name, limit: 100 } }).then(({ data }) => {
      if (active) setRemoteProducts((current) => mergeProducts(current, data.products || []));
    }).catch(() => {});
    return () => { active = false; };
  }, [department]);

  useEffect(() => {
    if (!isSearch || query.trim().length < 2) return;
    let active = true;
    api.get('/products/search', { params: { q: query.trim() } }).then(({ data }) => {
      if (active && Array.isArray(data)) setRemoteProducts((current) => mergeProducts(current, data));
    }).catch(() => {});
    return () => { active = false; };
  }, [isSearch, query]);

  useEffect(() => {
    const update = () => setWishlist(readBeautyWishlist());
    window.addEventListener('beauty-wishlist-change', update);
    window.addEventListener('storage', update);
    return () => { window.removeEventListener('beauty-wishlist-change', update); window.removeEventListener('storage', update); };
  }, []);

  useEffect(() => {
    setBrand(''); setPriceBand(''); setRating(''); setDiscount(''); setMaximumDiscount(''); setAvailability(''); setAgeGroup(''); setSort('featured');
  }, [location.pathname]);

  const catalog = useMemo(() => mergeProducts(baseProducts, remoteProducts), [remoteProducts]);
  const scopedProducts = useMemo(() => catalog.filter((product) => {
    if (department && product.department !== department.name) return false;
    if (department && path.length > 1 && !(product.listingRoute === currentPath || product.listingRoute?.startsWith(`${currentPath}/`))) return false;
    if (isSearch && query.trim()) {
      const text = `${product.name} ${product.brand} ${product.description} ${product.category} ${product.subcategory} ${product.group} ${product.specifications?.author || ''}`.toLowerCase();
      if (!text.includes(query.trim().toLowerCase())) return false;
    }
    if (isOffers && !product.discount) return false;
    if (isArrivals && !isRecent(product)) return false;
    if (brand && product.brand !== brand) return false;
    if (rating && Number(product.rating || 0) < Number(rating)) return false;
    if (discount && Number(product.discount || 0) < Number(discount)) return false;
    if (maximumDiscount && Number(product.discount || 0) > Number(maximumDiscount)) return false;
    if (availability === 'in-stock' && product.stock <= 0) return false;
    if (availability === 'out-of-stock' && product.stock > 0) return false;
    if (ageGroup && product.ageGroup !== ageGroup) return false;
    if (priceBand) {
      const [min, max] = priceBand.split('-').map(Number);
      if (product.price < min || (max && product.price > max)) return false;
    }
    return true;
  }).sort((first, second) => sort === 'price-low' ? first.price - second.price : sort === 'price-high' ? second.price - first.price : sort === 'rating' ? second.rating - first.rating : sort === 'discount' ? second.discount - first.discount : new Date(second.createdAt) - new Date(first.createdAt)), [catalog, department, path.length, currentPath, isSearch, query, isOffers, isArrivals, brand, rating, discount, maximumDiscount, availability, ageGroup, priceBand, sort]);

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

  if (isDetail) return <CatalogProductDetail slug={path[1]} products={catalog} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} buyNow={buyNow} />;
  if (isWishlist) return <section className="shop-page"><div className="shop-heading"><div><span className="shop-eyebrow">SAVED FOR LATER</span><h1>My Wishlist</h1></div><Link to="/">Continue shopping</Link></div><CatalogWishlist products={wishlist} onRemove={toggleWishlist} onAdd={addToCart} /></section>;

  const activeGroup = pageInfo.group;
  const activeCategory = pageInfo.category;
  const activeSubcategory = pageInfo.subcategory;
  const pageTitle = isSearch ? (query ? `Results for “${query}”` : 'Search all products') : isOffers ? 'Offers & deals' : isArrivals ? 'New Arrivals' : activeSubcategory || activeCategory?.name || activeGroup?.name || department?.name || 'Shop all';
  const brandOptions = [...new Set(scopedProducts.map((product) => product.brand).filter(Boolean))].sort();
  const groupsToDisplay = department && path.length === 1 ? department.groups.filter((entry) => entry.slug) : [];
  const categoriesToDisplay = activeGroup
    ? activeGroup.categories.map((entry) => ({ entry, departmentGroup: activeGroup }))
    : department && path.length === 1
      ? department.groups.filter((entry) => !entry.slug).flatMap((departmentGroup) => departmentGroup.categories.map((entry) => ({ entry, departmentGroup })))
      : [];

  return <section className="shop-page">
    {notice && <div className="shop-toast" role="status">{notice}</div>}
    <header className="shop-listing-head"><div><span className="shop-eyebrow">{department ? `LUMORA / ${department.name}` : isOffers ? 'LUMORA / SAVE MORE' : isArrivals ? 'LUMORA / JUST LANDED' : isSearch ? 'LUMORA / SEARCH' : 'LUMORA / WISHLIST'}</span><h1>{pageTitle}</h1><p>{department?.description || (isOffers ? 'Current markdowns across the store, sorted by your next good find.' : isArrivals ? 'Recently added pieces across every department.' : isSearch ? 'Search products across every department.' : 'Browse every department, all in one place.')}</p></div>{activeCategory && <Link to={getDepartmentRoute(department)}>All {department.name}</Link>}</header>
    {isOffers && <div className="shop-offer-campaigns">{[['Today\'s Deals', '', ''], ['Flash Sale', '40', ''], ['Up to 20% Off', '', '20'], ['Up to 40% Off', '', '40'], ['Up to 50% Off', '', '50'], ['Clearance Sale', '30', ''], ['Combo Offers', '20', ''], ['New User Offers', '10', '']].map(([label, minimum, maximum]) => <button key={label} onClick={() => { setDiscount(minimum); setMaximumDiscount(maximum); }}>{label}</button>)}</div>}
    {isArrivals && <nav className="shop-arrival-nav" aria-label="New arrivals by department">{allDepartments.filter((entry) => ['fashion', 'mobiles', 'electronics', 'beauty', 'toys', 'sports', 'books', 'furniture', 'home-kitchen', 'footwear'].includes(entry.slug)).map((entry) => <Link key={entry.slug} to={`/${entry.slug}`}>{entry.name}</Link>)}</nav>}
    {groupsToDisplay.length > 0 && <section className="shop-taxonomy-section"><div className="shop-heading"><div><span className="shop-eyebrow">Explore</span><h2>Shop by collection</h2></div></div><div className="shop-taxonomy-grid">{groupsToDisplay.map((entry) => <Link className="shop-taxonomy-card" to={getGroupRoute(department, entry)} key={entry.slug}><img src={shoppingProducts.find((product) => product.department === department.name && product.group === entry.name)?.imageUrl} alt={entry.name} loading="lazy" /><span>{entry.name}</span><small>{entry.categories.length} categories ↗</small></Link>)}</div></section>}
    {categoriesToDisplay.length > 0 && <section className="shop-taxonomy-section"><div className="shop-heading"><div><span className="shop-eyebrow">{activeGroup?.name || department?.name}</span><h2>Shop categories</h2></div></div><div className="shop-subcategory-grid">{categoriesToDisplay.map(({ entry, departmentGroup }) => <Link className="shop-subcategory-card" to={getCategoryRoute(department, departmentGroup, entry)} key={`${departmentGroup.slug}-${entry.slug}`}><img src={entry.images?.[0] ? `https://images.unsplash.com/${entry.images[0]}?auto=format&fit=crop&w=700&q=85` : shoppingProducts.find((product) => product.department === department.name && product.category === entry.name)?.imageUrl} alt={entry.name} loading="lazy" /><span>{entry.name}</span><small>{entry.subcategories.length ? `${entry.subcategories.length} subcategories` : 'Shop collection'} ↗</small></Link>)}</div></section>}
    {activeCategory?.subcategories.length > 0 && <nav className="shop-subcategory-nav" aria-label={`${activeCategory.name} subcategories`}>{activeCategory.subcategories.map((subcategory) => <Link key={subcategory} to={getSubcategoryRoute(department, activeGroup, activeCategory, subcategory)}>{subcategory}</Link>)}</nav>}
    <section className="shop-listing-section"><div className="shop-results-heading"><span>{scopedProducts.length} products</span><Link to="/my-wishlist">Wishlist {wishlist.length ? `(${wishlist.length})` : ''}</Link></div><div className="shop-toolbar"><input aria-label="Search all products" type="search" placeholder="Search all products" value={query} onChange={(event) => { setQuery(event.target.value); if (!isSearch) navigate(`/search?q=${encodeURIComponent(event.target.value)}`); }} /><select aria-label="Department" value={department?.slug || ''} onChange={(event) => navigate(event.target.value ? `/${event.target.value}` : '/') }><option value="">All departments</option>{allDepartments.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name}</option>)}</select><select aria-label="Brand" value={brand} onChange={(event) => setBrand(event.target.value)}><option value="">All brands</option>{brandOptions.map((name) => <option key={name}>{name}</option>)}</select><select aria-label="Price range" value={priceBand} onChange={(event) => setPriceBand(event.target.value)}><option value="">Any price</option><option value="0-298">Under ₹299</option><option value="299-499">₹299–₹499</option><option value="500-999">₹499–₹999</option><option value="1000-1999">₹999–₹1,999</option><option value="2000-0">Above ₹2,000</option></select><select aria-label="Minimum rating" value={rating} onChange={(event) => setRating(event.target.value)}><option value="">Any rating</option><option value="4">4★ & above</option><option value="3">3★ & above</option></select><select aria-label="Minimum discount" value={discount} onChange={(event) => setDiscount(event.target.value)}><option value="">Any discount</option><option value="10">10%+</option><option value="20">20%+</option><option value="30">30%+</option><option value="50">50%+</option></select><select aria-label="Availability" value={availability} onChange={(event) => setAvailability(event.target.value)}><option value="">Any availability</option><option value="in-stock">In Stock</option><option value="out-of-stock">Out of Stock</option></select>{department?.slug === 'toys' && <select aria-label="Age group" value={ageGroup} onChange={(event) => setAgeGroup(event.target.value)}><option value="">All ages</option>{['0-2 Years', '3-5 Years', '6-8 Years', '9-12 Years'].map((age) => <option key={age}>{age}</option>)}</select>}<select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option><option value="discount">Biggest discount</option></select></div><ShopGrid products={scopedProducts} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} buyNow={buyNow} /></section>
  </section>;
}

function isRecent(product) {
  return product.isNew || Date.now() - new Date(product.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
}

function mergeProducts(existing, incoming) {
  const products = new Map(existing.map((product) => [productKey(product), product]));
  for (const remote of incoming) {
    const normalized = String(remote.department || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
    const localMatch = baseProducts.find((product) => productKey(product) === productKey(remote));
    const departmentEntry = shoppingDepartments.find((item) => item.name.toLowerCase().replace(/[^a-z0-9]+/g, '') === normalized);
    const routeEntry = localMatch || (departmentEntry && shoppingProducts.find((product) => product.department === remote.department && product.category === remote.category && product.subcategory === remote.subcategory));
    products.set(productKey(remote), { ...routeEntry, ...remote, slug: routeEntry?.slug || slugify(remote.name), route: `/catalog/${routeEntry?.slug || slugify(remote.name)}`, listingRoute: routeEntry?.listingRoute || `/${slugify(remote.department)}/${slugify(remote.category)}` });
  }
  return [...products.values()];
}