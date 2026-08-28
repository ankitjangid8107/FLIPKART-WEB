"use client";

import Link from "next/link";
import { useStore, DELIVERY_FREE_THRESHOLD } from "@/lib/store";
import { getProduct, formatINR } from "@/lib/data";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";

export default function CartPage() {
  const { ready, cart, setQty, removeFromCart, cartTotals, toggleWishlist } = useStore();

  if (!ready) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-slate-400 md:px-6">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
        <p className="mt-4 text-sm">Loading your cart…</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
        <p className="text-7xl">🛒</p>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Your cart is empty</h1>
        <p className="mt-1 text-sm text-slate-500">Add items you love — they&apos;ll show up right here.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const t = cartTotals();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="rounded-2xl bg-white ring-1 ring-slate-100 card-3d">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h1 className="text-lg font-bold text-slate-900">
                My Cart <span className="text-sm font-medium text-slate-400">({t.count} item{t.count > 1 ? "s" : ""})</span>
              </h1>
              <span className="text-sm font-semibold text-emerald-600">
                {t.itemsTotal >= DELIVERY_FREE_THRESHOLD ? "✓ Free delivery applies" : `Add ${formatINR(DELIVERY_FREE_THRESHOLD - t.itemsTotal)} for free delivery`}
              </span>
            </div>

            {cart.map((item) => {
              const p = getProduct(item.id);
              if (!p) return null;
              return (
                <div key={item.id} className="flex gap-4 border-b border-slate-50 p-4 last:border-0 sm:p-5">
                  <Link
                    href={`/product/${p.id}`}
                    className={`grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${p.tint} text-5xl sm:h-28 sm:w-28`}
                  >
                    <span className="product-art select-none">{p.emoji}</span>
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${p.id}`} className="clamp-2 text-sm font-medium text-slate-800 hover:text-blue-700 sm:text-base">
                      {p.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-slate-400">Seller: tvc0 Retail Pvt Ltd · <span className="font-semibold text-emerald-600">In Stock</span></p>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-slate-900">{formatINR(p.price)}</span>
                      <span className="text-xs text-slate-400 line-through">{formatINR(p.mrp)}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <div className="flex items-center rounded-lg ring-1 ring-slate-200">
                        <button
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="grid h-9 w-9 place-items-center text-slate-600 hover:bg-slate-50"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-9 text-center text-sm font-bold text-slate-900">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="grid h-9 w-9 place-items-center text-slate-600 hover:bg-slate-50"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="rounded-lg px-3 py-2 text-sm font-bold text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-blue-700"
                      >
                        Save for later
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold text-slate-500 ring-1 ring-slate-200 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <TrashIcon className="h-4 w-4" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-end p-4">
              <Link
                href="/checkout"
                className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-10 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:brightness-110"
              >
                PLACE ORDER
              </Link>
            </div>
          </div>
        </div>

        {/* Price details */}
        <aside className="self-start lg:sticky lg:top-28">
          <div className="rounded-2xl bg-white ring-1 ring-slate-100 card-3d">
            <p className="border-b border-slate-100 px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-400">
              Price Details
            </p>
            <div className="space-y-3 px-5 py-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Price ({t.count} items)</span>
                <span className="font-medium text-slate-900">{formatINR(t.mrpTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Discount</span>
                <span className="font-medium text-emerald-600">− {formatINR(t.mrpTotal - t.itemsTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges</span>
                <span className={`font-medium ${t.delivery === 0 ? "text-emerald-600" : "text-slate-900"}`}>
                  {t.delivery === 0 ? "FREE" : formatINR(t.delivery)}
                </span>
              </div>
              <div className="flex justify-between border-t border-dashed border-slate-200 pt-3 text-base font-bold text-slate-900">
                <span>Total Amount</span>
                <span>{formatINR(t.total)}</span>
              </div>
              <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                You will save {formatINR(t.mrpTotal - t.itemsTotal)} on this order 🎉
              </p>
            </div>
          </div>
          <p className="mt-4 px-2 text-xs leading-5 text-slate-400">
            🔒 Safe and Secure Payments · Easy returns · 100% Authentic products
          </p>
        </aside>
      </div>
    </div>
  );
}
