import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import api from '../services/api.js';

const categoryOptions = [
  { value: 'for-you', label: 'For You' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'mobiles', label: 'Mobiles' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'toys', label: 'Toys' },
  { value: 'sports', label: 'Sports' },
  { value: 'books', label: 'Books' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'tools', label: 'Tools' },
];

const fallbackCatalog = {
  'for-you': [
    { _id: 'fy-1', name: 'Smart Fitness Watch', category: 'Electronics', price: 2999, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85', description: 'Track daily activity in a premium modern design.' },
    { _id: 'fy-2', name: 'Silk Statement Dress', category: 'Fashion', price: 2499, imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85', description: 'Elegant comfort for day-to-night styling.' },
    { _id: 'fy-3', name: 'Glow Essentials Kit', category: 'Beauty', price: 1499, imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85', description: 'Skin-friendly beauty essentials for your routine.' },
  ],
  fashion: [
    { _id: 'fa-1', name: 'Minimal Oversized Shirt', category: 'Fashion', price: 1499, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85', description: 'Soft everyday fit with premium style.' },
    { _id: 'fa-2', name: 'Elegant Floral Dress', category: 'Fashion', price: 2599, imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85', description: 'Sophisticated pieces for events and outings.' },
    { _id: 'fa-3', name: 'Classic Casual Hoodie', category: 'Fashion', price: 1999, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85', description: 'A relaxed staple for everyday comfort.' },
  ],
  mobiles: [
    { _id: 'mo-1', name: 'Astra Pro 5G', category: 'Mobiles', price: 27999, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85', description: 'Premium camera and smooth performance.' },
    { _id: 'mo-2', name: 'Metro Fold X', category: 'Mobiles', price: 32999, imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85', description: 'Foldable innovation for a smarter lifestyle.' },
    { _id: 'mo-3', name: 'Pulse Lite Smartphone', category: 'Mobiles', price: 18999, imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=85', description: 'Powerful features in a sleek, everyday design.' },
  ],
  electronics: [
    { _id: 'el-1', name: 'Wireless Noise Cancelling Headphones', category: 'Electronics', price: 4999, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85', description: 'Immersive sound with deep, clean bass.' },
    { _id: 'el-2', name: 'Smart Watch Horizon', category: 'Electronics', price: 6999, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=85', description: 'Stay connected, active, and on time.' },
    { _id: 'el-3', name: 'Compact Bluetooth Speaker', category: 'Electronics', price: 3499, imageUrl: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=85', description: 'Portable sound with crisp clarity.' },
  ],
  beauty: [
    { _id: 'be-1', name: 'Glow Ritual Set', category: 'Beauty', price: 1699, imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85', description: 'Hydrating essentials for a fresh, radiant look.' },
    { _id: 'be-2', name: 'Natural Skin Care Kit', category: 'Beauty', price: 2199, imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85', description: 'Thoughtful skincare for everyday self-care.' },
    { _id: 'be-3', name: 'Fragrance Mist Trio', category: 'Beauty', price: 1899, imageUrl: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=900&q=85', description: 'Light, elegant scents to elevate your mood.' },
  ],
  toys: [
    { _id: 'to-1', name: 'STEM Learning Kit', category: 'Toys', price: 2499, imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=85', description: 'Creative fun that inspires imagination and learning.' },
    { _id: 'to-2', name: 'Adventure Plush Set', category: 'Toys', price: 1299, imageUrl: 'https://images.unsplash.com/photo-1556575157-75a0d79d2f8a?auto=format&fit=crop&w=900&q=85', description: 'Soft companions for joyful playtime moments.' },
    { _id: 'to-3', name: 'Mini Building Blocks', category: 'Toys', price: 999, imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=85', description: 'Build, stack, and create endless stories.' },
  ],
  sports: [
    { _id: 'sp-1', name: 'Performance Running Shoes', category: 'Sports', price: 3499, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', description: 'Lightweight comfort built for movement.' },
    { _id: 'sp-2', name: 'Pro Yoga Mat', category: 'Sports', price: 1499, imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85', description: 'Supportive grip and extra cushioning.' },
    { _id: 'sp-3', name: 'Gym Essentials Kit', category: 'Sports', price: 2799, imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85', description: 'Functional gear for active everyday routines.' },
  ],
  books: [
    { _id: 'bo-1', name: 'Mindful Living Book', category: 'Books', price: 699, imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=85', description: 'Smart, calming reads for everyday growth.' },
    { _id: 'bo-2', name: 'Creative Design Guide', category: 'Books', price: 899, imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=85', description: 'Inspiring ideas for modern living and work.' },
    { _id: 'bo-3', name: 'Best of Fiction Collection', category: 'Books', price: 1299, imageUrl: 'https://images.unsplash.com/photo-1516979187454-437ec7d9d58b?auto=format&fit=crop&w=900&q=85', description: 'A collection of stories to enjoy at your pace.' },
  ],
  furniture: [
    { _id: 'fu-1', name: 'Modern Accent Chair', category: 'Furniture', price: 8999, imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85', description: 'Comfort and style for your home setting.' },
    { _id: 'fu-2', name: 'Minimal Desk Setup', category: 'Furniture', price: 14999, imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85', description: 'Practical workspace essentials in one clean form.' },
    { _id: 'fu-3', name: 'Cozy Accent Table', category: 'Furniture', price: 6499, imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85', description: 'A soft modern finish for relaxed spaces.' },
  ],
  tools: [
    { _id: 'tl-1', name: 'Power Drill Set', category: 'Tools', price: 6999, imageUrl: 'https://images.unsplash.com/photo-1581147036324-c17ac5c9ce0d?auto=format&fit=crop&w=900&q=85', description: 'Built for daily repairs and home projects.' },
    { _id: 'tl-2', name: 'Multi-Tool Kit', category: 'Tools', price: 3999, imageUrl: 'https://images.unsplash.com/photo-1601762603339-fd61e28b698a?auto=format&fit=crop&w=900&q=85', description: 'Professional-grade essentials for every toolkit.' },
    { _id: 'tl-3', name: 'Complete Home Repair Kit', category: 'Tools', price: 5499, imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85', description: 'Smart essentials for quick fixes at home.' },
  ],
};

const allCatalogProducts = Object.values(fallbackCatalog).flat();

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState(allCatalogProducts);
  const [category, setCategory] = useState('for-you');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const selected = new URLSearchParams(location.search).get('category') || 'for-you';
    if (selected === 'beauty') {
      navigate('/beauty', { replace: true });
      return;
    }
    setCategory(categoryOptions.some((item) => item.value === selected) ? selected : 'for-you');
  }, [location.search, navigate]);

  useEffect(() => {
    let active = true;
    const displayCategory = category === 'for-you' ? '' : category;
    const fallbackProducts = displayCategory ? (fallbackCatalog[displayCategory] || []) : allCatalogProducts;

    const request = query.trim()
      ? api.get('/products/search', { params: { q: query } })
      : api.get('/products', { params: { category: displayCategory || undefined, limit: 50 } }).then(({ data }) => ({ data: data.products || fallbackProducts }));

    request.then(({ data }) => {
      if (!active) return;
      const safeData = Array.isArray(data) ? data : (data || []);
      setProducts(safeData.length ? safeData : fallbackProducts);
      setError('');
    }).catch(() => {
      if (!active) return;
      const searchable = query.trim()
        ? allCatalogProducts.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase()))
        : fallbackProducts;
      setProducts(searchable);
      setError('');
    });

    return () => { active = false; };
  }, [category, query]);

  const currentLabel = useMemo(() => categoryOptions.find((item) => item.value === category)?.label || 'For You', [category]);

  return (
    <section className="content-page">
      <div className="page-heading"><div><p className="eyebrow">Marketplace</p><h1>{currentLabel}</h1></div><p className="heading-note">Separate category details for the products you selected.</p></div>
      <div className="filters"><input aria-label="Search products" placeholder="Search products" value={query} onChange={(event) => setQuery(event.target.value)} /><select value={category} onChange={(event) => setCategory(event.target.value)}>{categoryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
      {error && <p className="form-error">{error}</p>}
      {products.length ? <div className="product-grid">{products.map((product) => <ProductCard key={product._id || `${product.name}-${product.category}`} product={product} />)}</div> : <div className="state-panel">No products match that search yet.</div>}
    </section>
  );
}
