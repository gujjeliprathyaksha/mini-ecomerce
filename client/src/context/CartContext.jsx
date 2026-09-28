import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.js';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext(null);
const LOCAL_CART_KEY = 'lumora-local-cart';
const objectIdPattern = /^[a-f\d]{24}$/i;

function readLocalCart() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_CART_KEY) || '[]');
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [localItems, setLocalItems] = useState(readLocalCart);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(localItems));
    if (!user) setCart({ items: localItems });
  }, [localItems, user]);

  async function refreshCart() {
    if (!user) {
      setCart({ items: localItems });
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get('/cart');
      setCart(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshCart().catch(() => setCart({ items: [] }));
  }, [user, localItems]);

  async function addItem(productId, qty = 1, product = null) {
    localStorage.removeItem('lumora-beauty-last-order');
    if (!user || !objectIdPattern.test(productId)) {
      setLocalItems((current) => {
        const existing = current.find((item) => item.product?._id === productId);
        if (existing) return current.map((item) => item.product?._id === productId ? { ...item, qty: item.qty + qty } : item);
        return [...current, { _id: `local-${productId}`, qty, product: { ...product, _id: productId } }];
      });
      return;
    }
    const { data } = await api.post('/cart', { productId, qty });
    setCart(data);
  }

  async function removeItem(itemId) {
    if (itemId.startsWith('local-')) {
      setLocalItems((current) => current.filter((item) => item._id !== itemId));
      return;
    }
    const { data } = await api.delete(`/cart/${itemId}`);
    setCart(data);
  }

  async function updateItemQuantity(itemId, qty) {
    const safeQty = Math.max(1, Math.floor(Number(qty) || 1));
    if (itemId.startsWith('local-')) {
      setLocalItems((current) => current.map((item) => item._id === itemId ? { ...item, qty: safeQty } : item));
      return;
    }
    const { data } = await api.put(`/cart/${itemId}`, { qty: safeQty });
    setCart(data);
  }

  const itemCount = cart.items.reduce((total, item) => total + item.qty, 0);
  const subtotal = cart.items.reduce(
    (total, item) => total + (item.product?.price || 0) * item.qty,
    0,
  );

  return (
    <CartContext.Provider value={{ cart, loading, itemCount, subtotal, refreshCart, addItem, removeItem, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
