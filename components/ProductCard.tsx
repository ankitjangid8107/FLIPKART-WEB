"use client";

import Link from "next/link";
import { formatINR, discountPct, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { HeartIcon } from "@/components/icons";

export function RatingPill({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md bg-emerald-600 px-1.5 py-0.5 text-xs font-bold text-white ${className}`}
    >
      {value.toFixed(1)} <span className="text-[10px]">★</span>
    </span>
  );
}

export default function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const inWishlist = wishlist.includes(product.id);
  const off = discountPct(product);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 card-3d lift">
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label="Toggle wishlist"
        className="absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-sm ring-1 ring-slate-100 transition hover:scale-110"
      >
        <HeartIcon className={`h-4 w-4 ${inWishlist ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
      </button>

      <Link href={`/product/${product.id}`} className="flex flex-1 flex-col">
        <div className={`relative aspect-square bg-gradient-to-br ${product.tint} grid place-items-center overflow-hidden`}>
          <span
            className="product-art select-none text-6xl transition-transform duration-300 group-hover:scale-110 sm:text-7xl"
            role="img"
            aria-label={product.title}
          >
            {product.emoji}
          </span>
          {off >= 25 && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">
              {off}% OFF
            </span>
          )}
          {product.assured && (
            <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-bold text-blue-700 shadow-sm backdrop-blur">
              ✓ Assured
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{product.brand}</p>
          <h3 className="clamp-2 text-sm font-medium leading-snug text-slate-800 hover:text-blue-700">{product.title}</h3>
          <div className="mt-auto pt-1.5">
            <div className="flex items-center gap-1.5">
              <RatingPill value={product.rating} />
              <span className="text-xs text-slate-400">({product.ratingCount.toLocaleString("en-IN")})</span>
            </div>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className="text-lg font-bold text-slate-900">{formatINR(product.price)}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-xs text-slate-400 line-through">{formatINR(product.mrp)}</span>
                  <span className="text-xs font-semibold text-emerald-600">{off}% off</span>
                </>
              )}
            </div>
            <p className="mt-0.5 text-[11px] font-medium text-slate-500">Free delivery</p>
          </div>
        </div>
      </Link>

      {!compact && (
        <div className="px-3 pb-3">
          <button
            onClick={() => addToCart(product.id)}
            className="w-full rounded-xl bg-blue-600/10 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}
