export const WISHLIST_KEY = 'lumora-wishlist';
export const BEAUTY_WISHLIST_KEY = 'lumora-beauty-wishlist';

export function readBeautyWishlist() {
  try {
    const unified = JSON.parse(localStorage.getItem(WISHLIST_KEY) || 'null');
    return Array.isArray(unified) ? unified : JSON.parse(localStorage.getItem(BEAUTY_WISHLIST_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveBeautyWishlist(products) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(products));
  localStorage.setItem(BEAUTY_WISHLIST_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event('beauty-wishlist-change'));
}

export function toggleWishlistProduct(product) {
  const current = readBeautyWishlist();
  const productId = String(product?._id || product?.id || product?.slug || product?.name);
  const exists = current.some((entry) => String(entry?._id || entry?.id || entry?.slug || entry?.name) === productId);
  const next = exists
    ? current.filter((entry) => String(entry?._id || entry?.id || entry?.slug || entry?.name) !== productId)
    : [...current, product];
  saveBeautyWishlist(next);
  return { next, exists };
}