"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "./data";

export type CartItem = { id: string; qty: number };
export type Address = {
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pin: string;
  type: "Home" | "Work";
};
export type OrderItem = { id: string; qty: number; price: number };
export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  itemsTotal: number;
  delivery: number;
  total: number;
  address: Address;
  payment: string;
  status: "Confirmed";
};

type Toast = { id: number; msg: string };

type StoreValue = {
  ready: boolean;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  user: string | null;
  cartCount: number;
  addToCart: (id: string, qty?: number, silent?: boolean) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  placeOrder: (address: Address, payment: string) => Order;
  login: (name: string) => void;
  logout: () => void;
  toast: (msg: string) => void;
  cartTotals: () => { itemsTotal: number; mrpTotal: number; delivery: number; total: number; count: number };
};

const StoreContext = createContext<StoreValue | null>(null);

const DELIVERY_FREE_ABOVE = 500;
const DELIVERY_FEE = 40;

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    setCart(load<CartItem[]>("tvc0.cart", []));
    setWishlist(load<string[]>("tvc0.wishlist", []));
    setOrders(load<Order[]>("tvc0.orders", []));
    setUser(load<string | null>("tvc0.user", null));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem("tvc0.cart", JSON.stringify(cart));
  }, [cart, ready]);
  useEffect(() => {
    if (ready) window.localStorage.setItem("tvc0.wishlist", JSON.stringify(wishlist));
  }, [wishlist, ready]);
  useEffect(() => {
    if (ready) window.localStorage.setItem("tvc0.orders", JSON.stringify(orders));
  }, [orders, ready]);
  useEffect(() => {
    if (ready) window.localStorage.setItem("tvc0.user", JSON.stringify(user));
  }, [user, ready]);

  const toast = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2400);
  }, []);

  const addToCart = useCallback(
    (id: string, qty = 1, silent = false) => {
      setCart((c) => {
        const found = c.find((i) => i.id === id);
        if (found)
          return c.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + qty, 10) } : i));
        return [...c, { id, qty }];
      });
      if (!silent) toast("Added to cart");
    },
    [toast]
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) =>
      qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 10) } : i))
    );
  }, []);

  const removeFromCart = useCallback(
    (id: string) => {
      setCart((c) => c.filter((i) => i.id !== id));
      toast("Removed from cart");
    },
    [toast]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlist((w) => {
        const has = w.includes(id);
        toast(has ? "Removed from wishlist" : "Added to wishlist");
        return has ? w.filter((x) => x !== id) : [...w, id];
      });
    },
    [toast]
  );

  const placeOrder = useCallback(
    (address: Address, payment: string): Order => {
      const items: OrderItem[] = cart.map((i) => ({
        id: i.id,
        qty: i.qty,
        price: getProduct(i.id)?.price ?? 0,
      }));
      const itemsTotal = items.reduce((s, i) => s + i.price * i.qty, 0);
      const delivery = itemsTotal >= DELIVERY_FREE_ABOVE ? 0 : DELIVERY_FEE;
      const order: Order = {
        id: "TVC" + Date.now().toString().slice(-9),
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        items,
        itemsTotal,
        delivery,
        total: itemsTotal + delivery,
        address,
        payment,
        status: "Confirmed",
      };
      setOrders((o) => [order, ...o]);
      setCart([]);
      return order;
    },
    [cart]
  );

  const login = useCallback(
    (name: string) => {
      setUser(name);
      toast(`Welcome, ${name}`);
    },
    [toast]
  );

  const logout = useCallback(() => {
    setUser(null);
    toast("Logged out");
  }, [toast]);

  const cartTotals = useCallback(() => {
    let itemsTotal = 0;
    let mrpTotal = 0;
    let count = 0;
    for (const i of cart) {
      const p = getProduct(i.id);
      if (!p) continue;
      itemsTotal += p.price * i.qty;
      mrpTotal += p.mrp * i.qty;
      count += i.qty;
    }
    const delivery = itemsTotal === 0 || itemsTotal >= DELIVERY_FREE_ABOVE ? 0 : DELIVERY_FEE;
    return { itemsTotal, mrpTotal, delivery, total: itemsTotal + delivery, count };
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const value: StoreValue = {
    ready,
    cart,
    wishlist,
    orders,
    user,
    cartCount,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    placeOrder,
    login,
    logout,
    toast,
    cartTotals,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
      {/* Toasts */}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[90] flex flex-col items-center gap-2 px-4 md:bottom-8">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-pop rounded-full bg-slate-900/90 px-5 py-2.5 text-sm font-medium text-white shadow-xl backdrop-blur"
          >
            {t.msg}
          </div>
        ))}
      </div>
    </StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export const DELIVERY_FREE_THRESHOLD = DELIVERY_FREE_ABOVE;
