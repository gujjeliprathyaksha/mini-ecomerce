import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categoryData, categoryNavigation } from '../data/categoryData.js';
import { useAuth } from '../context/AuthContext.jsx';

const audienceLinks = [['Women', 'women.html'], ['Men', 'men.html'], ['Kids', 'kids.html'], ['Girls', 'girls.html'], ['Boys', 'boys.html']];
const productImages = Object.values(categoryData).flatMap((item) => item.products).slice(0, 24);

function ShopPage() {
  const [filter, setFilter] = useState('All');
  const groups = ['All', 'Women', 'Men', 'Kids', 'Sarees', 'Kurthas', 'Western', 'Jeans', 'Dresses', 'Footwear', 'Bags', 'Accessories'];
  const shown = filter === 'All' ? productImages : productImages.filter((product) => product.name.toLowerCase().includes(filter.toLowerCase().replace('s', '')));
  return <section className="marketplace-page"><div className="marketplace-hero"><p className="eyebrow">The complete LUMORA edit</p><h1>Shop Everything.</h1><p>Fashion, beauty and everyday details for every person and every mood.</p></div><div className="shop-filters">{groups.map((group) => <button className={filter === group ? 'active' : ''} onClick={() => setFilter(group)} key={group}>{group}</button>)}</div><div className="marketplace-grid">{shown.map((product, index) => <article className="marketplace-card" key={`${product.id}-${index}`}><div><img src={product.image} alt={product.name} /><button aria-label="Add to wishlist">♡</button></div><span>{index % 3 === 0 ? 'NEW' : 'CURATED'}</span><h2>{product.name}</h2><p>Soft details · considered quality</p><strong>₹{product.price.toLocaleString('en-IN')}</strong><del>₹{product.oldPrice.toLocaleString('en-IN')}</del><button className="add-button">Add to Cart <b>+</b></button></article>)}</div></section>;
}

function CategoriesPage() {
  return <section className="marketplace-page"><div className="marketplace-hero"><p className="eyebrow">Find your next edit</p><h1>Categories.</h1><p>Start with a world, then find the pieces that feel like you.</p></div><div className="link-hub-grid"><div><h2>Shop by person</h2>{audienceLinks.map(([label, href]) => <Link to={`/${href}`} key={label}>{label}<span>↗</span></Link>)}</div><div><h2>Shop by style</h2>{categoryNavigation.map(([label, href]) => <Link to={`/${href}`} key={label}>{label}<span>↗</span></Link>)}</div><div><h2>Shop the moment</h2>{[['New Arrivals', 'new-arrivals.html'], ['Trending', 'trending.html'], ['Offers', 'offers.html'], ['Beauty', 'beauty.html']].map(([label, href]) => <Link to={`/${href}`} key={label}>{label}<span>↗</span></Link>)}</div></div></section>;
}

function WishlistPage() {
  const [liked, setLiked] = useState(() => JSON.parse(localStorage.getItem('lumora-wishlist') || '[]'));
  const likedProducts = productImages.filter((product) => liked.includes(product.id));
  function remove(id) { const next = liked.filter((item) => item !== id); setLiked(next); localStorage.setItem('lumora-wishlist', JSON.stringify(next)); }
  return <section className="marketplace-page"><div className="marketplace-hero compact"><p className="eyebrow">Saved for later</p><h1>Your Likes.</h1><p>Pieces you loved enough to keep close.</p></div>{likedProducts.length ? <div className="marketplace-grid">{likedProducts.map((product) => <article className="marketplace-card" key={product.id}><div><img src={product.image} alt={product.name} /></div><h2>{product.name}</h2><strong>₹{product.price.toLocaleString('en-IN')}</strong><button className="text-button" onClick={() => remove(product.id)}>Remove ♡</button></article>)}</div> : <div className="empty-marketplace">Your likes are waiting. Tap a heart on any product to save it here.<Link className="button button-dark" to="/shop.html">Explore the shop ↗</Link></div>}</section>;
}

function AccountPage() {
  const { user, signOut } = useAuth();
  return <section className="marketplace-page account-page"><div className="marketplace-hero compact"><p className="eyebrow">Your LUMORA space</p><h1>{user ? `Hello, ${user.name}.` : 'Your Account.'}</h1><p>Keep your orders, likes and details in one considered place.</p></div><div className="account-grid">{[['Profile', user?.email || 'Sign in to see your profile'], ['My Orders', 'Track every beautiful delivery'], ['My Wishlist', 'Your saved edits'], ['Saved Addresses', 'Quick, easy checkout'], ['Payment Methods', 'Secure and simple'], ['Settings', 'Make Lumora yours']].map(([title, copy]) => <article key={title}><span>✦</span><h2>{title}</h2><p>{copy}</p></article>)}</div>{user ? <button className="button button-dark" onClick={signOut}>Sign out</button> : <Link className="button button-dark" to="/login">Log in to LUMORA</Link>}</section>;
}

export default function MarketplacePage() {
  const { page } = useParams();
  if (page === 'shop') return <ShopPage />;
  if (page === 'categories') return <CategoriesPage />;
  if (page === 'wishlist') return <WishlistPage />;
  return <AccountPage />;
}
