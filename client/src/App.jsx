import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { useCart } from './context/CartContext.jsx';
import { useTheme } from './context/ThemeContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import Orders from './pages/Orders.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Products from './pages/Products.jsx';
import Register from './pages/Register.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import SpecialPage from './pages/SpecialPage.jsx';
import MarketplacePage from './pages/MarketplacePage.jsx';
import DepartmentPage from './pages/DepartmentPage.jsx';
import TaxonomyProducts from './pages/TaxonomyProducts.jsx';
import BeautyPage from './pages/BeautyPage.jsx';
import DepartmentShop from './pages/DepartmentShop.jsx';
import { shoppingDepartments } from './data/shoppingCatalog.js';
import TrackOrder from './pages/TrackOrder.jsx';
import { readBeautyWishlist, toggleWishlistProduct } from './data/beautyWishlist.js';

const products = [
  ['Minimal Oversized T-Shirt', 'Fashion', '₹699', '₹999', '40% OFF', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85'],
  ['Elegant Floral Dress', 'Fashion', '₹1,299', '₹1,999', '35% OFF', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85'],
  ['Everyday White Sneakers', 'Footwear', '₹1,499', '₹2,199', '32% OFF', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85'],
  ['Premium Smart Watch', 'Electronics', '₹2,499', '₹3,999', '38% OFF', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85'],
  ['Wireless Noise Cancelling Headphones', 'Electronics', '₹2,999', '₹4,999', '40% OFF', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85'],
  ['Minimal Leather Handbag', 'Accessories', '₹1,299', '₹1,899', '32% OFF', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85'],
  ['Lavender Body Care Set', 'Beauty', '₹899', '₹1,299', '30% OFF', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=85'],
  ['Aesthetic Desk Lamp', 'Home & Living', '₹799', '₹1,199', '33% OFF', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85'],
  ['Classic Sunglasses', 'Accessories', '₹599', '₹999', '40% OFF', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85'],
  ['Everyday Laptop Backpack', 'Accessories', '₹1,199', '₹1,799', '33% OFF', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85'],
  ['Ceramic Coffee Set', 'Home & Living', '₹699', '₹999', '30% OFF', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=85'],
  ['Minimal Wireless Mouse', 'Electronics', '₹799', '₹1,199', '33% OFF', 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=85'],
  ['Soft Cotton Hoodie', 'Fashion', '₹999', '₹1,499', '33% OFF', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85'],
  ['Premium Analog Watch', 'Accessories', '₹1,599', '₹2,499', '36% OFF', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85'],
  ['Minimal Phone Case', 'Accessories', '₹399', '₹699', '43% OFF', 'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=700&q=85'],
  ['Aesthetic Room Decor Set', 'Home & Living', '₹899', '₹1,299', '31% OFF', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=85'],
].map(([name, category, price, oldPrice, discount, image], index) => ({ name, category, price, oldPrice, discount, image, index }));

const categories = [
  ['Kurta Sets', 'Elegant everyday ethnic styles', '👗', '/kurta.html', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85'],
  ['Sarees', 'Timeless elegance, beautifully draped', '🥻', '/sarees.html', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85'],
  ['Western Wear', 'Modern looks for every mood', '✦', '/western.html', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85'],
  ['Dresses', 'Make every moment stylish', '♡', '/dresses.html', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85'],
  ['Tops', 'Everyday essentials with a modern touch', '✿', '/tops.html', 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85'],
  ['Bottom Wear', 'Comfort meets effortless style', '◒', '/bottoms.html', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85'],
  ['Ethnic Wear', 'Celebrate tradition in your own way', '❋', '/ethnic.html', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85'],
  ['Party Wear', 'Looks made for special moments', '✧', '/partywear.html', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85'],
  ['Accessories', 'Complete your look', '◇', '/accessories.html', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85'],
];

function SectionTitle({ eyebrow, title, action }) {
  return <div className="section-title"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{action}</div>;
}

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [liked, setLiked] = useState(() => readBeautyWishlist().map((item) => item.name));
  const [taste, setTaste] = useState('Minimal');
  const [toast, setToast] = useState('');
  const [seconds, setSeconds] = useState(8 * 3600 + 24 * 60 + 36);
  const recommended = useMemo(() => products.filter((product) => product.category.includes(taste === 'Cozy' ? 'Home' : taste === 'Elegant' ? 'Beauty' : taste === 'Trendy' ? 'Accessories' : 'Fashion')).slice(0, 3), [taste]);

  if (window.location.pathname.endsWith('.html')) {
    const page = window.location.pathname.split('/').pop().replace('.html', '');
    return ['new-arrivals', 'offers', 'about', 'contact'].includes(page) ? <SpecialPage /> : ['shop', 'categories', 'wishlist', 'account'].includes(page) ? <MarketplacePage /> : <CategoryPage />;
  }

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((current) => current > 0 ? current - 1 : 8 * 3600 + 24 * 60 + 36), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (location.pathname.startsWith('/beauty')) return <BeautyPage />;
  if (location.pathname === '/track-order') return <TrackOrder />;
  if (location.pathname === '/shopping-cart') return <Cart />;
  if (['/my-wishlist', '/search', '/offers', '/arrivals'].includes(location.pathname) || location.pathname.startsWith('/catalog/') || shoppingDepartments.some((department) => location.pathname.startsWith(`/${department.slug}`))) return <DepartmentShop />;

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  }

  function toggleLike(name) {
    const source = products.find((product) => product.name === name);
    const product = {
      ...source,
      id: `home-${name}`,
      _id: `home-${name}`,
      slug: `home-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      department: source.category,
      subcategory: source.category,
      price: Number(String(source.price).replace(/[^0-9]/g, '')),
      originalPrice: Number(String(source.oldPrice).replace(/[^0-9]/g, '')),
      discount: Number(String(source.discount).replace(/[^0-9]/g, '')),
      imageUrl: source.image,
      images: [source.image],
      rating: 4.8,
      reviews: 0,
    };
    const { next, exists } = toggleWishlistProduct(product);
    setLiked(next.map((item) => item.name));
    notify(exists ? 'Product removed from Wishlist' : 'Product added to Wishlist ❤️');
  }

  return <>
    {toast && <div className="toast">{toast}</div>}
    <section className="lumora-hero" id="home">
      <div className="hero-content"><span className="eyebrow">The new everyday edit · 2026</span><h1>Find Your<br /><i>Everyday Beautiful.</i></h1><p>Curated essentials, modern style and little things that make life better.</p><div className="hero-buttons"><a className="button button-dark" href="#featured">Explore Collection <span>↗</span></a><a className="button button-light" href="#new-arrivals">Shop New Arrivals</a></div><div className="hero-mini-proof"><span>✦</span><span><strong>4.9 / 5</strong><small>Loved by our community</small></span></div></div>
      <div className="hero-visual"><div className="hero-petal petal-one"></div><div className="hero-petal petal-two"></div><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=90" alt="Woman browsing a curated fashion collection" /><span className="floating-badge badge-top">✦ New<br />Collection</span><span className="floating-badge badge-bottom">Trending<br /><b>Now ↗</b></span><span className="hero-caption">A little more you<br /><b>in every detail.</b></span></div>
    </section>

    <section className="audience-section section"><SectionTitle eyebrow="One wardrobe, every world" title={<>Fashion for <i>everyone.</i></>} action={<p className="section-note">Find your fit, your mood and your people.</p>} /><div className="audience-grid"><a href="/women.html" className="audience-card audience-women"><strong>Women</strong><span>Styles that feel like you ↗</span></a><a href="/men.html" className="audience-card audience-men"><strong>Men</strong><span>Everyday, refined ↗</span></a><a href="/girls.html" className="audience-card audience-girls"><strong>Girls</strong><span>Playful and polished ↗</span></a><a href="/boys.html" className="audience-card audience-boys"><strong>Boys</strong><span>Made for movement ↗</span></a><a href="/kids.html" className="audience-card audience-kids"><strong>Kids</strong><span>Little looks, big joy ↗</span></a></div></section>

    <section className="section categories-section" id="categories"><SectionTitle eyebrow="Explore by feeling" title={<>Find your <i>thing.</i></>} action={<a className="quiet-link" href="#featured">View all categories ↗</a>} /><div className="category-grid">{categories.map(([name, description, icon, href, image]) => <a className="category-card" href={href} key={name}><img src={image} alt={name} /><div className="category-overlay"></div><div className="category-card-copy"><span>{icon}</span><strong>{name}</strong><small>{description}</small><b>Explore <em>→</em></b></div></a>)}</div></section>

    <section className="section featured-section" id="featured"><SectionTitle eyebrow="Things you'll love. Things you'll use." title={<>Curated <i>For You.</i></>} action={<Link className="quiet-link" to="/products">Shop all products ↗</Link>} /><div className="featured-grid">{products.map((product) => <article className="lumora-product-card" key={product.name}><div className="product-photo"><img src={product.image} alt={product.name} loading="lazy" /><span className="product-tag">{product.index < 4 ? 'TRENDING' : 'NEW'}</span><button className={`heart-button ${liked.includes(product.name) ? 'is-liked' : ''}`} onClick={() => toggleLike(product.name)} aria-label={`Wishlist ${product.name}`}>{liked.includes(product.name) ? '♥' : '♡'}</button></div><div className="product-card-copy"><span className="product-kicker">{product.category}</span><h3>{product.name}</h3><p>Thoughtfully chosen · everyday quality</p><div className="product-rating">★★★★★ <span>4.{7 + (product.index % 3)}</span></div><div className="price-line"><strong>{product.price}</strong><del>{product.oldPrice}</del><span>{product.discount}</span></div><button className="add-button" onClick={() => navigate('/products')}>Add to Cart <b>+</b></button></div></article>)}</div></section>

    <section className="new-arrivals section" id="new-arrivals"><SectionTitle eyebrow="Just landed" title={<>Freshly <i>Added.</i></>} action={<span className="section-note">New pieces for your everyday lifestyle.</span>} /><div className="arrival-row">{products.slice(2, 8).map((product) => <a className="arrival-card" href="#featured" key={product.name}><div><img src={product.image} alt={product.name} loading="lazy" /><span>JUST IN</span></div><strong>{product.name}</strong><small>{product.price}</small></a>)}</div></section>

    <section className="flash-section" id="offers"><div className="section flash-inner"><div className="flash-copy"><span className="eyebrow">The weekend edit</span><h2>Little Prices.<br /><i>Big Finds.</i></h2><p>Beautiful pieces, softer prices. Make room for something lovely.</p><a className="button button-dark" href="#featured">Shop Deals <span>→</span></a></div><div className="flash-clock"><span>Offer ends in</span><strong>{String(Math.floor(seconds / 3600)).padStart(2, '0')} : {String(Math.floor(seconds / 60) % 60).padStart(2, '0')} : {String(seconds % 60).padStart(2, '0')}</strong><small>Up to 60% off selected finds</small></div><div className="flash-art"><img src={products[5].image} alt="Minimal leather handbag" /><span>−60%</span></div></div></section>

    <section className="lifestyle-section section"><SectionTitle eyebrow="The Lumora way" title={<>More Than <i>Shopping.</i></>} action={<p className="section-note">Discover products that fit your style, your space and your everyday moments.</p>} /><div className="lifestyle-grid"><div className="lifestyle-card lifestyle-day"><span>01</span><div><h3>Style Your Day</h3><p>Easy pieces, endless ways to be you.</p></div></div><div className="lifestyle-card lifestyle-space"><span>02</span><div><h3>Upgrade Your Space</h3><p>Small details. Softer surroundings.</p></div></div><div className="lifestyle-card lifestyle-special"><span>03</span><div><h3>Make Everyday Special</h3><p>Little rituals worth keeping.</p></div></div></div></section>

    <section className="personal-section section"><div className="personal-copy"><span className="eyebrow">Your taste, your edit</span><h2>Made <i>For You.</i></h2><p>Tell us what feels like you. We will do the curating.</p><div className="taste-pills">{['Minimal', 'Elegant', 'Casual', 'Trendy', 'Cozy', 'Modern'].map((item) => <button className={taste === item ? 'selected' : ''} key={item} onClick={() => setTaste(item)}>♡ {item}</button>)}</div></div><div className="recommended-row">{recommended.map((product) => <div className="recommend-card" key={product.name}><img src={product.image} alt={product.name} /><div><span>{product.category}</span><strong>{product.name}</strong><small>{product.price}</small></div></div>)}</div></section>

    <section className="reviews-section section"><SectionTitle eyebrow="Kind words" title={<>Loved By Our <i>Community.</i></>} /><div className="reviews-grid">{[['Ananya', 'Beautiful quality and even better packaging. The entire shopping experience felt premium.', 'Everyday edit'], ['Riya', 'The little details made my order feel like a gift to myself.', 'Home & Living'], ['Meera', 'Finally, a place where useful and beautiful can exist together.', 'Style edit'], ['Aarav', 'Fast delivery, lovely curation and the headphones are perfect.', 'Tech finds']].map(([name, quote, product], index) => <article className="review-card" key={name}><div className="review-stars">★★★★★</div><p>“{quote}”</p><footer><span className={`avatar avatar-${index}`}>{name[0]}</span><span><strong>— {name}</strong><small>{product}</small></span></footer></article>)}</div></section>

    <section className="why-section section"><div className="why-grid">{[['🚚', 'Fast Delivery', 'Quick and reliable delivery'], ['🔒', 'Secure Payments', 'Your payments are protected'], ['↩', 'Easy Returns', 'Simple and hassle-free returns'], ['💗', 'Carefully Curated', 'Products selected with care']].map(([icon, title, copy]) => <div className="why-card" key={title}><span>{icon}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>

    <section className="app-promo section"><div className="phone-mockup"><div className="phone-top"></div><div className="phone-brand">LUMORA <span>♡</span></div><div className="phone-image"><img src={products[1].image} alt="Lumora product interface" /></div><small>For your everyday</small><strong>Soft things,<br />good feelings.</strong><div className="phone-nav">⌂　♡　▢　☻</div></div><div className="app-promo-copy"><span className="eyebrow">A little Lumora, wherever you go</span><h2>Shopping, But<br /><i>Make It Beautiful.</i></h2><p>Discover. Save. Shop. Your everyday edit is always close by.</p><a className="button button-dark" href="#home">Explore LUMORA <span>↗</span></a></div></section>

    <section className="newsletter-section section"><div><span className="eyebrow">A note from us</span><h2>Stay in the Loop <i>✦</i></h2><p>Get first access to new arrivals, exclusive offers and little shopping inspirations.</p></div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); notify('You are on the list. Welcome to Lumora.'); }}><input type="email" placeholder="Enter your email" required /><button>Join LUMORA <span>→</span></button></form></section>

    <footer className="lumora-footer" id="contact"><div className="footer-top"><div className="footer-brand"><Link to="/" className="lumora-logo">LUMORA<span>✦</span></Link><p>Everyday essentials,<br />beautifully curated.</p><div className="footer-socials"><a href="#contact">◎</a><a href="#contact">p</a><a href="#contact">f</a><a href="#contact">▶</a></div></div>{[['SHOP', 'New Arrivals', 'Best Sellers', 'Fashion', 'Electronics', 'Beauty'], ['HELP', 'Contact Us', 'Shipping', 'Returns', 'FAQ'], ['COMPANY', 'About', 'Careers', 'Privacy', 'Terms'], ['SOCIAL', 'Instagram', 'Pinterest', 'Facebook', 'YouTube']].map(([heading, ...links]) => <div className="footer-column" key={heading}><h4>{heading}</h4>{links.map((link) => <a href="#home" key={link}>{link}</a>)}</div>)}</div><div className="footer-bottom"><span>© 2026 LUMORA. All rights reserved.</span><span>Made for your everyday beautiful.</span></div></footer>
  </>;
}

const navItems = [
  { label: 'For You', to: '/products?category=for-you' },
  { label: 'Fashion', to: '/products?category=fashion' },
  { label: 'Mobiles', to: '/products?category=mobiles' },
  { label: 'Electronics', to: '/products?category=electronics' },
  { label: 'Beauty', to: '/products?category=beauty' },
  { label: 'Toys', to: '/products?category=toys' },
  { label: 'Sports', to: '/products?category=sports' },
  { label: 'Books', to: '/products?category=books' },
  { label: 'Furniture', to: '/products?category=furniture' },
  { label: 'Tools', to: '/products?category=tools' },
];

function App() {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  return <div className="app-shell"><header className="site-header"><Link className="lumora-logo" to="/">LUMORA<span>✦</span></Link><nav aria-label="Main navigation"><NavLink to="/products?category=for-you">For You</NavLink><NavLink to="/products?category=fashion">Fashion</NavLink><NavLink to="/products?category=mobiles">Mobiles</NavLink><NavLink to="/products?category=electronics">Electronics</NavLink><NavLink to="/products?category=beauty">Beauty</NavLink><NavLink to="/products?category=toys">Toys</NavLink><NavLink to="/products?category=sports">Sports</NavLink><NavLink to="/products?category=books">Books</NavLink><NavLink to="/products?category=furniture">Furniture</NavLink><NavLink to="/products?category=tools">Tools</NavLink></nav><div className="header-actions"><button aria-label="Search" onClick={() => window.location.assign('/products')}>⌕</button><button className="theme-toggle" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={toggleTheme}>{theme === 'dark' ? '☀' : '◐'}</button><NavLink aria-label="Wishlist" to="/products">♡</NavLink><NavLink aria-label="Orders" to={user ? '/orders' : '/login'}>🛍</NavLink><NavLink aria-label="Cart" to="/cart">🛒<span className="cart-count">{itemCount}</span></NavLink>{user ? <button aria-label="Sign out" onClick={signOut}>↪</button> : <NavLink aria-label="Account" to="/login">♙</NavLink>}</div></header><main><Routes><Route path="/" element={<Home />} /><Route path="/products" element={<Products />} /><Route path="/products/:id" element={<ProductDetail />} /><Route path="/browse/:department" element={<DepartmentPage />} /><Route path="/browse/:department/:category" element={<TaxonomyProducts />} /><Route path="/browse/:department/:category/:subcategory" element={<TaxonomyProducts />} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route path="/cart" element={<Cart />} /><Route path="/my-orders" element={<Orders />} /><Route element={<ProtectedRoute />}><Route path="/orders" element={<Orders />} /></Route><Route path="*" element={<Home />} /></Routes></main></div>;
}

export default App;
