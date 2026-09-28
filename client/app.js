const catalog = [
  { id: 'silk-1', name: 'Silk Sunrise Saree', category: 'Sarees', type: 'Silk Sarees', price: 1499, oldPrice: 2199, discount: 32, rating: 4.8, colors: ['Blush', 'Ivory', 'Sage'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'silk-2', name: 'Pearl Weave Saree', category: 'Sarees', type: 'Silk Sarees', price: 1899, oldPrice: 2599, discount: 27, rating: 4.7, colors: ['Champagne','Rose','Lotus'], sizes: ['S','M','L'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'silk-3', name: 'Rose Gold Kanjivaram', category: 'Sarees', type: 'Kanjivaram Sarees', price: 2299, oldPrice: 3199, discount: 28, rating: 4.9, colors: ['Rose','Gold','Peach'], sizes: ['M','L','XL'], image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', new: false },
  { id: 'silk-4', name: 'Luna Banarasi', category: 'Sarees', type: 'Banarasi Sarees', price: 1999, oldPrice: 2899, discount: 31, rating: 4.8, colors: ['Plum','Ivory','Champagne'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', new: false },
  { id: 'saree-5', name: 'Cotton Comfort Saree', category: 'Sarees', type: 'Cotton Sarees', price: 999, oldPrice: 1499, discount: 33, rating: 4.5, colors: ['Mustard','Green','Cream'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'saree-6', name: 'Soft Organza Saree', category: 'Sarees', type: 'Organza Sarees', price: 1899, oldPrice: 2499, discount: 24, rating: 4.7, colors: ['Blush','Lavender','White'], sizes: ['S','M','L'], image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'saree-7', name: 'Royal Georgette Saree', category: 'Sarees', type: 'Georgette Sarees', price: 1799, oldPrice: 2399, discount: 25, rating: 4.8, colors: ['Wine','Navy','Peach'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80', new: false },
  { id: 'saree-8', name: 'Velvet Festive Saree', category: 'Sarees', type: 'Designer Party Sarees', price: 2499, oldPrice: 3499, discount: 29, rating: 4.9, colors: ['Emerald','Maroon','Gold'], sizes: ['M','L','XL'], image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'saree-9', name: 'Printed Chiffon Saree', category: 'Sarees', type: 'Chiffon Sarees', price: 1699, oldPrice: 2299, discount: 26, rating: 4.7, colors: ['Rose','Sage','Sky'], sizes: ['S','M','L'], image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'saree-10', name: 'Classic Linen Saree', category: 'Sarees', type: 'Linen Sarees', price: 1399, oldPrice: 1999, discount: 30, rating: 4.6, colors: ['Beige','Olive','Cream'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', new: false },
  { id: 'kurta-1', name: 'Soft Anarkali Kurtha', category: 'Kurthas', type: 'Anarkali Kurtha', price: 1299, oldPrice: 1999, discount: 35, rating: 4.8, colors: ['Lavender','Peach','Ivory'], sizes: ['S','M','L'], image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'kurta-2', name: 'Violet Chikankari', category: 'Kurthas', type: 'Chikankari Kurtha', price: 1499, oldPrice: 2199, discount: 32, rating: 4.7, colors: ['Violet','Cream','Rose'], sizes: ['XS','S','M','L'], image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80', new: false },
  { id: 'kurta-3', name: 'Sage Cotton Kurtha', category: 'Kurthas', type: 'Cotton Kurtha', price: 899, oldPrice: 1399, discount: 36, rating: 4.6, colors: ['Sage','Dusty Rose','Cream'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'kurta-4', name: 'Dusky Palazzo Kurtha Set', category: 'Kurthas', type: 'Kurtha Palazzo Set', price: 1799, oldPrice: 2599, discount: 31, rating: 4.9, colors: ['Dusty Rose','Ivory','Lavender'], sizes: ['S','M','L'], image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'jean-1', name: 'Light Blue Baggy Jeans', category: 'Jeans', type: 'Baggy Jeans', price: 1499, oldPrice: 2199, discount: 32, rating: 4.7, colors: ['Blue','Grey','Black'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'jean-2', name: 'Dark Indigo Wides', category: 'Jeans', type: 'Wide Leg Jeans', price: 1699, oldPrice: 2399, discount: 29, rating: 4.8, colors: ['Indigo','Black','Ash'], sizes: ['S','M','L'], image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', new: false },
  { id: 'jean-3', name: 'Vintage Mom Jeans', category: 'Jeans', type: 'Mom Jeans', price: 1599, oldPrice: 2299, discount: 30, rating: 4.6, colors: ['Wash','Blue','Stone'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=900&q=80', new: false },
  { id: 'jean-4', name: 'Cargo Relaxed Fit', category: 'Jeans', type: 'Cargo Jeans', price: 1799, oldPrice: 2499, discount: 28, rating: 4.7, colors: ['Army','Beige','Black'], sizes: ['M','L','XL'], image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'western-1', name: 'Pastel Maxi Dress', category: 'Western', type: 'Maxi Dresses', price: 2199, oldPrice: 2999, discount: 27, rating: 4.9, colors: ['Blush','Lavender','Mint'], sizes: ['S','M','L'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'western-2', name: 'Soft Co-ord Set', category: 'Western', type: 'Co-ord Sets', price: 2499, oldPrice: 3299, discount: 24, rating: 4.8, colors: ['Cream','Rose','Sage'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', new: false },
  { id: 'western-3', name: 'Rose Wrap Dress', category: 'Western', type: 'Wrap Dress', price: 1999, oldPrice: 2799, discount: 29, rating: 4.8, colors: ['Rose','Ivory','Peach'], sizes: ['XS','S','M','L'], image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'western-4', name: 'Midnight Party Dress', category: 'Western', type: 'Party Dresses', price: 2599, oldPrice: 3599, discount: 28, rating: 4.9, colors: ['Navy','Black','Rose'], sizes: ['S','M','L'], image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'men-1', name: 'Slate Linen Shirt', category: 'Men', type: 'Men\'s Shirts', price: 1699, oldPrice: 2399, discount: 29, rating: 4.7, colors: ['Slate','Blue','Cream'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'men-2', name: 'Minimal T-Shirt', category: 'Men', type: 'Men\'s T-Shirts', price: 899, oldPrice: 1299, discount: 31, rating: 4.6, colors: ['Ash','White','Black'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80', new: false },
  { id: 'men-3', name: 'Oxford Trouser', category: 'Men', type: 'Men\'s Trousers', price: 1899, oldPrice: 2599, discount: 27, rating: 4.8, colors: ['Taupe','Navy','Olive'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', new: false },
  { id: 'men-4', name: 'Heritage Suit', category: 'Men', type: 'Men\'s Suits', price: 5299, oldPrice: 6999, discount: 24, rating: 4.9, colors: ['Charcoal','Taupe','Pearl'], sizes: ['M','L','XL'], image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'kids-1', name: 'Bloom Dress', category: 'Kids', type: 'Kids Dresses', price: 1099, oldPrice: 1499, discount: 27, rating: 4.8, colors: ['Pink','Lavender','Mint'], sizes: ['4Y','6Y','8Y'], image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'kids-2', name: 'Sunny Play T-Shirt', category: 'Kids', type: 'Kids T-Shirts', price: 799, oldPrice: 1099, discount: 27, rating: 4.7, colors: ['Coral','Sky','Lemon'], sizes: ['4Y','6Y','8Y','10Y'], image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=80', new: false },
  { id: 'kids-3', name: 'Twirl Denim', category: 'Kids', type: 'Kids Jeans', price: 1199, oldPrice: 1699, discount: 29, rating: 4.7, colors: ['Blue','Stone','Cream'], sizes: ['5Y','7Y','9Y'], image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80', new: true },
  { id: 'kids-4', name: 'Little Party Set', category: 'Kids', type: 'Kids Party Wear', price: 1499, oldPrice: 2099, discount: 29, rating: 4.9, colors: ['Rose','Lavender','Ivory'], sizes: ['4Y','6Y','8Y'], image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', new: true }
];

const categories = [
  { name: 'Women', description: 'Elegant silhouettes and effortless everyday staples.', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80' },
  { name: 'Men', description: 'Refined essentials designed for real life.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80' },
  { name: 'Kids', description: 'Soft colors, playful energy, easy comfort.', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=80' },
  { name: 'Sarees', description: 'Traditional elegance for every kind of celebration.', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80' },
  { name: 'Kurthas', description: 'Effortless comfort with beautiful drape.', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
  { name: 'Western', description: 'Modern layers and statement dressing.', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80' }
];

const sareeTypes = [
  { name: 'Silk Sarees', desc: 'Elegant silk sarees for festive and traditional occasions.', price: 1499, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80', page: 'silk-sarees.html' },
  { name: 'Kanjivaram Sarees', desc: 'Rich patterns and luxurious texture with heirloom charm.', price: 1999, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', page: 'silk-sarees.html' },
  { name: 'Banarasi Sarees', desc: 'Intricate motifs and a regal finish for celebrations.', price: 1799, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', page: 'silk-sarees.html' },
  { name: 'Cotton Sarees', desc: 'Lightweight comfort for everyday elegance.', price: 999, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', page: 'silk-sarees.html' },
  { name: 'Organza Sarees', desc: 'Soft sheer drape with a romantic finish.', price: 1899, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80', page: 'silk-sarees.html' },
  { name: 'Georgette Sarees', desc: 'Fluid movement and premium finishing for special evenings.', price: 1799, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80', page: 'silk-sarees.html' },
  { name: 'Chiffon Sarees', desc: 'Lightweight, romantic drape that feels luxurious and airy.', price: 1699, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', page: 'silk-sarees.html' },
  { name: 'Designer Party Sarees', desc: 'Statement pieces with shimmer and festive detail.', price: 2499, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80', page: 'silk-sarees.html' }
];
const kurthaTypes = [
  { name: 'Straight Kurtha', desc: 'Classic and versatile with an easy everyday silhouette.', price: 899, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', page: 'straight-kurtha.html' },
  { name: 'Anarkali Kurtha', desc: 'Flowy silhouettes designed for an elegant look.', price: 1299, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80', page: 'anarkali-kurtha.html' },
  { name: 'A-Line Kurtha', desc: 'A flattering fit with movement and ease.', price: 1099, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', page: 'a-line-kurtha.html' },
  { name: 'Chikankari Kurtha', desc: 'Fine embroidery with delicate detailing.', price: 1499, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80', page: 'chikankari-kurtha.html' },
  { name: 'Kurtha Palazzo Set', desc: 'Statement comfort with a tailored set finish.', price: 1799, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80', page: 'kurtha-palazzo.html' }
];
const jeansTypes = [
  { name: 'Baggy Jeans', desc: 'Relaxed denim with a modern street-style feel.', price: 1499, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80', page: 'baggy-jeans.html' },
  { name: 'Wide Leg Jeans', desc: 'Perfect posture and a soft drape for all-day wear.', price: 1699, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', page: 'baggy-jeans.html' },
  { name: 'Straight Fit Jeans', desc: 'Clean lines and flattering structure.', price: 1599, image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80', page: 'baggy-jeans.html' },
  { name: 'Mom Jeans', desc: 'Vintage-inspired fit with an elevated casual feel.', price: 1499, image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=900&q=80', page: 'baggy-jeans.html' }
];
const westernModels = [
  { name: 'Casual Dresses', desc: 'Easy layering with movement and softness.', price: 1799, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', page: 'western.html' },
  { name: 'Maxi Dresses', desc: 'Graceful silhouettes for day-to-night dressing.', price: 2199, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80', page: 'western.html' },
  { name: 'Co-ord Sets', desc: 'Elevated easy dressing with polished detail.', price: 2499, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', page: 'western.html' },
  { name: 'Party Dresses', desc: 'Subtle glamour and statement textures.', price: 2599, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', page: 'western.html' }
];
const dressModels = [
  { name: 'Floral Dress', desc: 'Fresh prints and airy movement.', price: 1899, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', page: 'dresses.html' },
  { name: 'Maxi Dress', desc: 'Statement floor-length elegance.', price: 2299, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80', page: 'dresses.html' },
  { name: 'Wrap Dress', desc: 'A flattering shape that works anywhere.', price: 1999, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', page: 'dresses.html' },
  { name: 'Party Dress', desc: 'Shimmering details for memorable nights.', price: 2899, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', page: 'dresses.html' }
];
const menCategories = [
  { name: 'Men\'s Shirts', desc: 'Clean layers for work and weekends.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80', page: 'men.html' },
  { name: 'Men\'s T-Shirts', desc: 'Clean staples with textured comfort.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80', page: 'men.html' },
  { name: 'Men\'s Jeans', desc: 'Structured denim for daily movement.', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', page: 'men.html' },
  { name: 'Men\'s Suits', desc: 'Modern tailoring with sharp ease.', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', page: 'men.html' }
];
const kidsCategories = [
  { name: 'Girls', desc: 'Soft layers and play-ready silhouettes.', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=80', page: 'kids.html' },
  { name: 'Boys', desc: 'Comfort-driven essentials for activity.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80', page: 'kids.html' },
  { name: 'Kids Dresses', desc: 'Colorful styles for happy moments.', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', page: 'kids.html' },
  { name: 'Kids Party Wear', desc: 'Joyful designs for celebrations.', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', page: 'kids.html' }
];

const navLinks = [
  { label: 'Home', href: 'index.html' },
  { label: 'Shop', href: 'shop.html' },
  { label: 'Categories', href: 'categories.html' },
  { label: 'New Arrivals', href: 'new-arrivals.html' },
  { label: 'Search', href: 'shop.html', icon: '⌕' },
  { label: 'Likes', href: 'wishlist.html', icon: '♡' },
  { label: 'Orders', href: 'orders.html', icon: '🛍' },
  { label: 'Cart', href: 'cart.html', icon: '🛒' },
  { label: 'Account', href: 'account.html', icon: '👤' }
];

const pages = {
  'index.html': 'Home',
  'shop.html': 'Shop',
  'categories.html': 'Categories',
  'new-arrivals.html': 'New Arrivals',
  'wishlist.html': 'Wishlist',
  'orders.html': 'Orders',
  'cart.html': 'Cart',
  'account.html': 'Account',
  'about.html': 'About',
  'contact.html': 'Contact',
  'sarees.html': 'Sarees',
  'silk-sarees.html': 'Silk Sarees',
  'kurthas.html': 'Kurthas',
  'anarkali-kurtha.html': 'Anarkali Kurtha',
  'jeans.html': 'Jeans',
  'baggy-jeans.html': 'Baggy Jeans',
  'western.html': 'Western',
  'dresses.html': 'Dresses',
  'men.html': 'Men',
  'kids.html': 'Kids'
};

const STORAGE_KEYS = {
  wishlist: 'lumora-wishlist',
  cart: 'lumora-cart'
};

function getStorage(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function toast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

function buildHeader() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const header = document.getElementById('site-header');
  if (!header) return;
  const nav = navLinks.filter((item) => item.label !== 'Search').map((item) => {
    const isActive = current === item.href;
    const icon = item.icon ? `<span>${item.icon}</span>` : '';
    return `<a href="${item.href}" class="${isActive ? 'active' : ''}">${icon}${item.label === 'Search' ? '' : item.label}</a>`;
  }).join('');
  const actions = `
    <div class="nav-actions">
      <a href="shop.html" aria-label="Search">⌕</a>
      <a href="wishlist.html" aria-label="Wishlist">♡<span class="count-badge" id="wishlist-count">${getStorage(STORAGE_KEYS.wishlist, []).length}</span></a>
      <a href="orders.html" aria-label="Orders">🛍</a>
      <a href="cart.html" aria-label="Cart">🛒<span class="count-badge" id="cart-count">${getStorage(STORAGE_KEYS.cart, []).reduce((sum, item) => sum + item.quantity, 0)}</span></a>
      <a href="account.html" aria-label="Account">👤</a>
      <button class="menu-toggle" aria-label="Open menu">☰</button>
    </div>
  `;
  header.innerHTML = `
    <a href="index.html" class="brand">LUMORA<span class="brand-mark">✦</span></a>
    <nav class="nav-links">${nav}</nav>
    ${actions}
  `;
  const menuButton = header.querySelector('.menu-toggle');
  const navWrap = header.querySelector('.nav-links');
  menuButton.addEventListener('click', () => {
    navWrap.style.display = navWrap.style.display === 'flex' ? 'none' : 'flex';
    navWrap.style.position = 'absolute';
    navWrap.style.top = '76px';
    navWrap.style.left = '1rem';
    navWrap.style.right = '1rem';
    navWrap.style.flexDirection = 'column';
    navWrap.style.background = 'rgba(41,33,61,0.98)';
    navWrap.style.padding = '1rem';
    navWrap.style.borderRadius = '18px';
    navWrap.style.border = '1px solid rgba(232,160,191,0.25)';
  });
}

function buildFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="brand" style="color:white;">LUMORA<span class="brand-mark">✦</span></div>
          <p>Fashion for every style, every age and every moment.</p>
        </div>
        <div class="footer-links">
          <h4>Shop</h4>
          <a href="categories.html">Women</a>
          <a href="men.html">Men</a>
          <a href="kids.html">Kids</a>
          <a href="new-arrivals.html">New Arrivals</a>
        </div>
        <div class="footer-links">
          <h4>Customer Care</h4>
          <a href="contact.html">Contact Us</a>
          <a href="about.html">Shipping</a>
          <a href="about.html">Returns</a>
          <a href="contact.html">FAQ</a>
        </div>
        <div class="footer-links">
          <h4>Company</h4>
          <a href="about.html">About</a>
          <a href="contact.html">Privacy</a>
          <a href="contact.html">Terms</a>
        </div>
        <div class="footer-links">
          <h4>Social</h4>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 LUMORA. All Rights Reserved.</span>
        <span>Style That Feels Like You</span>
      </div>
    </div>
  `;
}

function formatPrice(value) {
  return `₹${Number(value).toLocaleString('en-IN')}`;
}

function getWishlistIds() {
  return getStorage(STORAGE_KEYS.wishlist, []);
}

function toggleWishlist(productId) {
  const list = getStorage(STORAGE_KEYS.wishlist, []);
  const next = list.includes(productId) ? list.filter((id) => id !== productId) : [...list, productId];
  setStorage(STORAGE_KEYS.wishlist, next);
  updateHeaderCounts();
  renderWishlistPage();
  renderProducts();
  toast(next.includes(productId) ? 'Saved to wishlist' : 'Removed from wishlist');
}

function updateHeaderCounts() { 
  const wishlistCount = document.getElementById('wishlist-count');
  const cartCount = document.getElementById('cart-count');
  if (wishlistCount) wishlistCount.textContent = getStorage(STORAGE_KEYS.wishlist, []).length;
  if (cartCount) cartCount.textContent = getStorage(STORAGE_KEYS.cart, []).reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(productId, qty = 1) {
  const cart = getStorage(STORAGE_KEYS.cart, []);
  const item = cart.find((entry) => entry.id === productId);
  if (item) item.quantity += qty; else cart.push({ id: productId, quantity: qty });
  setStorage(STORAGE_KEYS.cart, cart);
  updateHeaderCounts();
  renderCartPage();
  toast('Added to cart');
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  const page = window.location.pathname.split('/').pop();
  const all = page === 'new-arrivals.html' ? catalog.filter((item) => item.new) : catalog;
  const favoriteIds = getWishlistIds();
  const filters = {
    category: document.getElementById('filter-category')?.value || 'All',
    sort: document.getElementById('sort-select')?.value || 'featured'
  };
  let visible = all.filter((item) => {
    return filters.category === 'All' || item.category === filters.category;
  });
  if (document.getElementById('search-input')) {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    if (query) visible = visible.filter((item) => `${item.name} ${item.type} ${item.category}`.toLowerCase().includes(query));
  }
  switch (filters.sort) {
    case 'low': visible = [...visible].sort((a, b) => a.price - b.price); break;
    case 'high': visible = [...visible].sort((a, b) => b.price - a.price); break;
    case 'rating': visible = [...visible].sort((a, b) => b.rating - a.rating); break;
    default: visible = [...visible];
  }
  if (!visible.length) {
    grid.innerHTML = '<div class="empty-state">No products match your filters yet.</div>';
    return;
  }
  grid.innerHTML = visible.map((product) => {
    const isFav = favoriteIds.includes(product.id);
    const colors = product.colors.map((color, idx) => `<span class="dot" style="background:${['#f6d7d8','#f1ead1','#c8d6bf','#d7d3f2','#c0ad9d','#f5d2ab'][idx % 6]};" title="${color}"></span>`).join('');
    const sizes = product.sizes.map((size) => `<span>${size}</span>`).join('');
    return `
      <article class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <span class="product-tag">${product.new ? 'New' : 'Trending'}</span>
          <button class="wishlist-toggle ${isFav ? 'active' : ''}" data-id="${product.id}" aria-label="Save to wishlist">${isFav ? '♥' : '♡'}</button>
        </div>
        <div class="product-body">
          <div class="product-meta">
            <span class="category-label">${product.type}</span>
            <span class="rating">★★★★★ ${product.rating}</span>
          </div>
          <h3>${product.name}</h3>
          <p>${product.category} essentials with premium finish.</p>
          <div class="price-row">
            <strong>${formatPrice(product.price)}</strong>
            <del>${formatPrice(product.oldPrice)}</del>
            <span>${product.discount}% OFF</span>
          </div>
          <div class="swatches">${colors}</div>
          <div class="sizes">${sizes}</div>
          <div class="button-row">
            <button class="button secondary add-to-cart" data-id="${product.id}">Add to cart</button>
            <button class="button primary buy-now" data-id="${product.id}">Buy now</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  document.querySelectorAll('.wishlist-toggle').forEach((button) => {
    button.addEventListener('click', () => toggleWishlist(button.dataset.id));
  });
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => addToCart(button.dataset.id));
  });
  document.querySelectorAll('.buy-now').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(button.dataset.id);
      window.location.href = 'cart.html';
    });
  });
}

function renderCollectionCards(items, targetId) {
  const host = document.getElementById(targetId);
  if (!host) return;
  host.innerHTML = items.map((item) => `
    <article class="collection-card">
      <div class="product-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="body">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="price-row">
          <strong>Starting from ${formatPrice(item.price)}</strong>
        </div>
        <a class="button secondary" href="${item.page}">Explore collection</a>
      </div>
    </article>
  `).join('');
}

function renderCategoriesPage() {
  const host = document.getElementById('category-grid');
  if (!host) return;
  host.innerHTML = categories.map((cat) => `
    <a class="category-card" href="${cat.name === 'Women' ? 'shop.html' : cat.name === 'Men' ? 'men.html' : cat.name === 'Kids' ? 'kids.html' : cat.name === 'Sarees' ? 'sarees.html' : cat.name === 'Kurthas' ? 'kurthas.html' : 'western.html'}">
      <img src="${cat.image}" alt="${cat.name}" />
      <div class="overlay"></div>
      <div class="info">
        <span class="icon">✦</span>
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
      </div>
    </a>
  `).join('');
}

function renderWishlistPage() {
  const host = document.getElementById('wishlist-grid');
  if (!host) return;
  const ids = getWishlistIds();
  const items = catalog.filter((product) => ids.includes(product.id));
  if (!items.length) {
    host.innerHTML = '<div class="empty-state">Your likes are waiting. Tap a heart on any product to save it here.</div>';
    return;
  }
  host.innerHTML = items.map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
        <button class="wishlist-toggle active" data-id="${product.id}">♥</button>
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span class="category-label">${product.type}</span>
          <span class="rating">★★★★★ ${product.rating}</span>
        </div>
        <h3>${product.name}</h3>
        <div class="price-row"><strong>${formatPrice(product.price)}</strong><del>${formatPrice(product.oldPrice)}</del></div>
        <div class="button-row">
          <button class="button secondary remove-wishlist" data-id="${product.id}">Remove</button>
          <button class="button primary add-to-cart" data-id="${product.id}">Add to cart</button>
        </div>
      </div>
    </article>
  `).join('');
  document.querySelectorAll('.remove-wishlist').forEach((button) => {
    button.addEventListener('click', () => toggleWishlist(button.dataset.id));
  });
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => addToCart(button.dataset.id));
  });
}

function renderCartPage() {
  const host = document.getElementById('cart-items');
  if (!host) return;
  const cart = getStorage(STORAGE_KEYS.cart, []);
  if (!cart.length) {
    host.innerHTML = '<div class="empty-state">Your basket is empty. Browse the latest collections to add a few favorites.</div>';
    document.getElementById('summary-box')?.querySelector('.summary-row.total')?.remove();
    return;
  }
  const lines = cart.map((entry) => {
    const product = catalog.find((item) => item.id === entry.id);
    if (!product) return '';
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" />
        <div class="cart-info">
          <h4>${product.name}</h4>
          <div class="cart-meta">Size: M • Color: Blush</div>
          <div class="qty-controls">
            <button data-action="minus" data-id="${product.id}">−</button>
            <span>${entry.quantity}</span>
            <button data-action="plus" data-id="${product.id}">+</button>
          </div>
        </div>
        <div class="cart-price">
          <strong>${formatPrice(product.price * entry.quantity)}</strong>
          <button class="remove-link" data-id="${product.id}">Remove</button>
        </div>
      </div>
    `;
  }).join('');
  host.innerHTML = lines;
  host.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const cartData = getStorage(STORAGE_KEYS.cart, []);
      const entry = cartData.find((item) => item.id === button.dataset.id);
      if (!entry) return;
      if (button.dataset.action === 'plus') entry.quantity += 1; else entry.quantity -= 1;
      if (entry.quantity <= 0) {
        const next = cartData.filter((item) => item.id !== button.dataset.id);
        setStorage(STORAGE_KEYS.cart, next);
      } else setStorage(STORAGE_KEYS.cart, cartData);
      updateHeaderCounts();
      renderCartPage();
    });
  });
  host.querySelectorAll('.remove-link').forEach((button) => {
    button.addEventListener('click', () => {
      const next = getStorage(STORAGE_KEYS.cart, []).filter((item) => item.id !== button.dataset.id);
      setStorage(STORAGE_KEYS.cart, next);
      updateHeaderCounts();
      renderCartPage();
    });
  });

  const subtotal = cart.reduce((sum, entry) => {
    const product = catalog.find((item) => item.id === entry.id);
    return product ? sum + product.price * entry.quantity : sum;
  }, 0);
  const discount = Math.round(subtotal * 0.12);
  const delivery = subtotal > 2500 ? 0 : 150;
  const total = subtotal - discount + delivery;
  const summary = document.getElementById('summary-box');
  if (summary) {
    summary.innerHTML = `
      <h3>Order Summary</h3>
      <div class="summary-row"><span>Subtotal</span><strong>${formatPrice(subtotal)}</strong></div>
      <div class="summary-row"><span>Discount</span><strong>-${formatPrice(discount)}</strong></div>
      <div class="summary-row"><span>Delivery</span><strong>${delivery === 0 ? 'Free' : formatPrice(delivery)}</strong></div>
      <div class="summary-row total"><span>Total</span><strong>${formatPrice(total)}</strong></div>
      <button class="button primary" type="button">Proceed to checkout</button>
      <button class="button secondary" type="button" onclick="window.location.href='shop.html'">Continue shopping</button>
    `;
  }
}

function renderOrdersPage() {
  const host = document.getElementById('orders-list');
  if (!host) return;
  const orders = [
    { id: 'LM10245', item: 'Pastel Anarkali Kurtha', price: 1299, status: ['Confirmed','Packed','Shipped'], ship: 'Delivered' },
    { id: 'LM10292', item: 'Silk Sunrise Saree', price: 1499, status: ['Confirmed','Packed','Shipped'], ship: 'On the way' },
    { id: 'LM10340', item: 'Light Blue Baggy Jeans', price: 1499, status: ['Confirmed','Packed'], ship: 'Processing' }
  ];
  host.innerHTML = orders.map((order) => `
    <article class="order-card">
      <div class="order-top">
        <div>
          <div class="eyebrow" style="margin-bottom:0.3rem;">Order #${order.id}</div>
          <h3>${order.item}</h3>
        </div>
        <span class="badge">${order.ship}</span>
      </div>
      <div class="price-row"><strong>${formatPrice(order.price)}</strong></div>
      <div class="status-list">
        ${order.status.map((item, index) => `<span class="status-item ${index < order.status.length ? 'complete' : ''}">✓ ${item}</span>`).join('')}
        <span class="status-item">○ Delivered</span>
      </div>
      <div class="order-actions">
        <button class="button secondary" type="button">View order</button>
        <button class="button secondary" type="button">Track order</button>
        <button class="button primary" type="button">Buy again</button>
      </div>
    </article>
  `).join('');
}

function buildHomePage() {
  const trendHost = document.getElementById('trending-grid');
  if (!trendHost) return;
  const cards = catalog.slice(0, 4).map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
        <span class="product-tag">Trending</span>
        <button class="wishlist-toggle" data-id="${product.id}">♡</button>
      </div>
      <div class="product-body">
        <div class="product-meta"><span class="category-label">${product.category}</span></div>
        <h3>${product.name}</h3>
        <div class="price-row"><strong>${formatPrice(product.price)}</strong><span>${product.discount}% OFF</span></div>
        <button class="button primary add-to-cart" data-id="${product.id}">Shop now</button>
      </div>
    </article>
  `).join('');
  trendHost.innerHTML = cards;
  trendHost.querySelectorAll('.wishlist-toggle').forEach((button) => {
    button.addEventListener('click', () => toggleWishlist(button.dataset.id));
  });
  trendHost.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => addToCart(button.dataset.id));
  });
}

function initialPageSetup() {
  buildHeader();
  buildFooter();
  updateHeaderCounts();
  const current = window.location.pathname.split('/').pop() || 'index.html';
  if (current === 'index.html') buildHomePage();
  if (current === 'categories.html') renderCategoriesPage();
  if (current === 'shop.html') {
    const input = document.getElementById('search-input');
    if (input) input.addEventListener('input', renderProducts);
    const filterCategory = document.getElementById('filter-category');
    if (filterCategory) filterCategory.addEventListener('change', renderProducts);
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.addEventListener('change', renderProducts);
    document.querySelectorAll('.filter-chip').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
        const category = button.dataset.category || 'All';
        const filter = document.getElementById('filter-category');
        if (filter) filter.value = category;
        renderProducts();
      });
    });
    renderProducts();
  }
  if (current === 'new-arrivals.html') renderProducts();
  if (current === 'wishlist.html') renderWishlistPage();
  if (current === 'cart.html') renderCartPage();
  if (current === 'orders.html') renderOrdersPage();
  if (current === 'sarees.html') renderCollectionCards(sareeTypes, 'collection-grid');
  if (current === 'kurthas.html') renderCollectionCards(kurthaTypes, 'collection-grid');
  if (current === 'jeans.html') renderCollectionCards(jeansTypes, 'collection-grid');
  if (current === 'western.html') renderCollectionCards(westernModels, 'collection-grid');
  if (current === 'dresses.html') renderCollectionCards(dressModels, 'collection-grid');
  if (current === 'men.html') renderCollectionCards(menCategories, 'collection-grid');
  if (current === 'kids.html') renderCollectionCards(kidsCategories, 'collection-grid');
  if (current === 'silk-sarees.html') {
    const silkProducts = catalog.filter((item) => item.type.includes('Silk') || item.type.includes('Kanjivaram'));
    const host = document.getElementById('product-grid');
    if (host) {
      host.innerHTML = silkProducts.map((product) => `
        <article class="product-card">
          <div class="product-image"><img src="${product.image}" alt="${product.name}" /><button class="wishlist-toggle" data-id="${product.id}">♡</button></div>
          <div class="product-body"><h3>${product.name}</h3><div class="price-row"><strong>${formatPrice(product.price)}</strong><del>${formatPrice(product.oldPrice)}</del></div><button class="button primary add-to-cart" data-id="${product.id}">Add to cart</button></div>
        </article>
      `).join('');
      host.querySelectorAll('.add-to-cart').forEach((button) => button.addEventListener('click', () => addToCart(button.dataset.id)));
      host.querySelectorAll('.wishlist-toggle').forEach((button) => button.addEventListener('click', () => toggleWishlist(button.dataset.id)));
    }
  }
  if (current === 'anarkali-kurtha.html') {
    const host = document.getElementById('product-grid');
    const items = catalog.filter((item) => item.type === 'Anarkali Kurtha');
    if (host && items.length) {
      host.innerHTML = items.map((product) => `
        <article class="product-card">
          <div class="product-image"><img src="${product.image}" alt="${product.name}" /><button class="wishlist-toggle" data-id="${product.id}">♡</button></div>
          <div class="product-body"><h3>${product.name}</h3><div class="price-row"><strong>${formatPrice(product.price)}</strong><del>${formatPrice(product.oldPrice)}</del></div><button class="button primary add-to-cart" data-id="${product.id}">Add to cart</button></div>
        </article>
      `).join('');
      host.querySelectorAll('.add-to-cart').forEach((button) => button.addEventListener('click', () => addToCart(button.dataset.id)));
      host.querySelectorAll('.wishlist-toggle').forEach((button) => button.addEventListener('click', () => toggleWishlist(button.dataset.id)));
    }
  }
  if (current === 'baggy-jeans.html') {
    const items = catalog.filter((item) => item.type === 'Baggy Jeans' || item.type === 'Wide Leg Jeans' || item.type === 'Mom Jeans' || item.type === 'Cargo Jeans');
    const host = document.getElementById('product-grid');
    if (host && items.length) {
      host.innerHTML = items.map((product) => `
        <article class="product-card">
          <div class="product-image"><img src="${product.image}" alt="${product.name}" /><button class="wishlist-toggle" data-id="${product.id}">♡</button></div>
          <div class="product-body"><h3>${product.name}</h3><div class="price-row"><strong>${formatPrice(product.price)}</strong><del>${formatPrice(product.oldPrice)}</del></div><button class="button primary add-to-cart" data-id="${product.id}">Add to cart</button></div>
        </article>
      `).join('');
      host.querySelectorAll('.add-to-cart').forEach((button) => button.addEventListener('click', () => addToCart(button.dataset.id)));
      host.querySelectorAll('.wishlist-toggle').forEach((button) => button.addEventListener('click', () => toggleWishlist(button.dataset.id)));
    }
  }
  if (current === 'shop.html' || current === 'new-arrivals.html') { updateHeaderCounts(); }
}

document.addEventListener('DOMContentLoaded', initialPageSetup);
