// Shared Cart Store
// Simple localStorage-backed cart so CartPage reflects real
// additions instead of a fixed sample list. Any page that adds
// a product to cart should import addToCart from here.

const CART_KEY = "sp_cart";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("sp_cart_updated"));
  } catch {
    // localStorage unavailable
  }
}

export function getCart() {
  return readCart();
}

export function addToCart(product, qty = 1) {
  const items = readCart();
  const existing = items.find(
    (i) => i.id === product.id && i.variant === product.variant,
  );
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({ ...product, qty });
  }
  writeCart(items);
  return items;
}

export function updateQuantity(id, delta) {
  const items = readCart().map((i) =>
    i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
  );
  writeCart(items);
  return items;
}

export function removeFromCart(id) {
  const items = readCart().filter((i) => i.id !== id);
  writeCart(items);
  return items;
}

export function clearCart() {
  writeCart([]);
}
