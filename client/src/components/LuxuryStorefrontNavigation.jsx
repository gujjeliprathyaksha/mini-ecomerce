import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { beautyCategories } from '../data/beautyCatalog.js';
import { getCategoryRoute, getDepartmentRoute, getGroupRoute, getSubcategoryRoute, shoppingDepartments } from '../data/shoppingCatalog.js';
import { readBeautyWishlist } from '../data/beautyWishlist.js';

const mainLinks = [
  ['Home', '/'], ['Fashion', '/fashion'], ['Women', '/fashion/women'], ['Men', '/fashion/men'],
  ['Kids', '/fashion/kids'], ['Sarees', '/fashion/women/sarees'], ['Beauty', '/beauty'],
  ['Mobiles', '/mobiles'], ['Electronics', '/electronics'], ['Toys', '/toys'], ['Sports', '/sports'],
  ['Books', '/books'], ['Furniture', '/furniture'], ['Tools', '/tools'], ['Home & Kitchen', '/home-kitchen'],
  ['Footwear', '/footwear'], ['Bags', '/bags-accessories'], ['Offers', '/offers'], ['New Arrivals', '/arrivals'], ['My Orders', '/my-orders'], ['Track Order', '/track-order'],
];

function departmentLinks(department) {
  return department.groups.flatMap((group) => {
    const groupLink = group.name && group.slug
      ? [{ label: group.name, href: getGroupRoute(department, group), strong: true }]
      : [];
    const categoryLinks = group.categories.flatMap((category) => [
      { label: category.name, href: getCategoryRoute(department, group, category), strong: false },
      ...category.subcategories.map((subcategory) => ({
        label: subcategory,
        href: getSubcategoryRoute(department, group, category, subcategory),
        strong: false,
      })),
    ]);
    return [...groupLink, ...categoryLinks];
  });
}

function beautySubcategoryUrl(category, subcategory) {
  const slug = subcategory === 'Face Serum'
    ? 'serums'
    : subcategory.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `/beauty/${category.slug}/${slug}`;
}

function beautyLinks() {
  return beautyCategories.flatMap((category) => [
    { label: category.name, href: `/beauty/${category.slug}`, strong: true },
    ...category.subcategories.map((subcategory) => ({ label: subcategory, href: beautySubcategoryUrl(category, subcategory), strong: false })),
  ]);
}

function MegaMenu() {
  return <details className="market-mega">
    <summary>Categories <span>⌄</span></summary>
    <div className="market-mega-panel">
      <section><Link className="market-mega-title" to="/beauty">Beauty</Link>{beautyLinks().map((entry) => <Link className={entry.strong ? 'market-mega-category' : ''} to={entry.href} key={`${entry.href}-${entry.label}`}>{entry.label}</Link>)}</section>
      {shoppingDepartments.map((department) => <section key={department.slug}>
        <Link className="market-mega-title" to={getDepartmentRoute(department)}>{department.name}</Link>
        {departmentLinks(department).map((entry, index) => <Link className={entry.strong ? 'market-mega-category' : ''} to={entry.href} key={`${department.slug}-${entry.href}-${index}`}>{entry.label}</Link>)}
      </section>)}
    </div>
  </details>;
}

export default function LuxuryStorefrontNavigation() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(() => readBeautyWishlist().length);
  const [wishlistNotice, setWishlistNotice] = useState('');

  function search(event) {
    event.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!accountOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setAccountOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [accountOpen]);

  useEffect(() => {
    const refreshWishlistCount = () => setWishlistCount(readBeautyWishlist().length);
    window.addEventListener('beauty-wishlist-change', refreshWishlistCount);
    window.addEventListener('storage', refreshWishlistCount);
    return () => {
      window.removeEventListener('beauty-wishlist-change', refreshWishlistCount);
      window.removeEventListener('storage', refreshWishlistCount);
    };
  }, []);

  useEffect(() => {
    const showWishlistNotice = (event) => {
      setWishlistNotice(event.detail || 'Wishlist updated');
      window.setTimeout(() => setWishlistNotice(''), 1800);
    };
    window.addEventListener('wishlist-feedback', showWishlistNotice);
    return () => window.removeEventListener('wishlist-feedback', showWishlistNotice);
  }, []);

  function closeMenu() {
    setMobileOpen(false);
  }

  return <>
    {wishlistNotice && <div className="shop-toast wishlist-toast" role="status">{wishlistNotice}</div>}
    <header className="market-header">
      <div className="market-sale-banner">THE LUMORA EDIT · UP TO 50% OFF · COMPLIMENTARY DELIVERY</div>
      <div className="market-header-top">
        <Link className="market-brand" to="/">LUMORA<span>✦</span></Link>
        <form className="market-search" role="search" onSubmit={search}>
          <input type="search" aria-label="Search all products" placeholder="Search products, brands and categories" value={query} onChange={(event) => setQuery(event.target.value)} />
          <button type="submit" aria-label="Search">⌕</button>
        </form>
        <div className="market-actions">
          <button className="market-icon-button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={toggleTheme}>{theme === 'dark' ? '☀' : '◐'}</button>
          <Link className="market-icon-button market-wishlist" aria-label={`Wishlist, ${wishlistCount} products`} to="/my-wishlist">♡<span>{wishlistCount}</span></Link>
          <Link className="market-icon-button market-cart" aria-label={`Cart, ${itemCount} items`} to="/shopping-cart">🛒<span>{itemCount}</span></Link>
          {user ? <Link className="market-icon-button" aria-label="Account and orders" to="/orders">♙</Link> : <button className="market-icon-button" aria-label="Open account options" onClick={() => setAccountOpen(true)}>♙</button>}
          {user && <button className="market-sign-out" onClick={signOut}>Sign out</button>}
          <button className="market-hamburger" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? '×' : '☰'}</button>
        </div>
      </div>
      <nav className="market-main-nav" aria-label="Main navigation">
        {mainLinks.map(([label, href]) => <NavLink key={label} to={href}>{label}</NavLink>)}
        <MegaMenu />
      </nav>
      {mobileOpen && <div className="market-mobile-menu">
        <form className="market-search mobile-search" role="search" onSubmit={search}>
          <input type="search" aria-label="Search all products" placeholder="Search products" value={query} onChange={(event) => setQuery(event.target.value)} />
          <button type="submit" aria-label="Search">⌕</button>
        </form>
        {mainLinks.map(([label, href]) => <NavLink key={label} to={href} onClick={closeMenu}>{label}</NavLink>)}
        <details><summary>Browse all categories</summary><div className="market-mobile-taxonomy">
          <Link to="/beauty" onClick={closeMenu}>Beauty</Link>
          {beautyLinks().map((entry) => <Link to={entry.href} key={entry.href} onClick={closeMenu}>{entry.label}</Link>)}
          {shoppingDepartments.map((department) => <section key={department.slug}>
            <Link className="market-mobile-department" to={getDepartmentRoute(department)} onClick={closeMenu}>{department.name}</Link>
            {departmentLinks(department).map((entry, index) => <Link to={entry.href} key={`${entry.href}-${index}`} onClick={closeMenu}>{entry.label}</Link>)}
          </section>)}
        </div></details>
      </div>}
    </header>
    {accountOpen && <div className="market-account-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAccountOpen(false); }}>
      <section className="market-account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-dialog-title">
        <button className="market-account-close" aria-label="Close account options" onClick={() => setAccountOpen(false)}>×</button>
        <span className="shop-eyebrow">YOUR LUMORA ACCOUNT</span>
        <h2 id="account-dialog-title">A little more lovely.</h2>
        <p>Sign in to find your saved pieces, track orders and pick up where you left off.</p>
        <div className="market-account-actions"><Link to="/login" onClick={() => setAccountOpen(false)}>Log in</Link><Link to="/register" onClick={() => setAccountOpen(false)}>Create account</Link></div>
      </section>
    </div>}
  </>;
}