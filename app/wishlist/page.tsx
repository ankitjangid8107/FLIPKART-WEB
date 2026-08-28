"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { ready, wishlist } = useStore();

  if (!ready) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      </div>
    );
  }

  const items = wishlist.map(getProduct).filter(Boolean);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
        <p className="text-7xl">💙</p>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Your wishlist is empty</h1>
        <p className="mt-1 text-sm text-slate-500">Tap the ♥ on any product to save it here for later.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25"
        >
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <h1 className="text-2xl font-extrabold text-slate-900">My Wishlist</h1>
      <p className="mt-1 text-sm text-slate-500">{items.length} saved item(s)</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => p && <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
