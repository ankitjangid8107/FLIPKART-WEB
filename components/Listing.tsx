"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/data";
import ProductCard from "./ProductCard";
import { ChevronDown } from "@/components/icons";

const PRICE_BUCKETS = [
  { label: "Under ₹1,000", min: 0, max: 1_000 },
  { label: "₹1,000 – ₹10,000", min: 1_000, max: 10_000 },
  { label: "₹10,000 – ₹25,000", min: 10_000, max: 25_000 },
  { label: "₹25,000 – ₹50,000", min: 25_000, max: 50_000 },
  { label: "Above ₹50,000", min: 50_000, max: Infinity },
];

const SORTS = [
  { id: "relevance", label: "Popularity" },
  { id: "price-asc", label: "Price — Low to High" },
  { id: "price-desc", label: "Price — High to Low" },
  { id: "rating", label: "Customer Rating" },
  { id: "discount", label: "Discount" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

export default function Listing({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  const [sort, setSort] = useState<SortId>("relevance");
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [buckets, setBuckets] = useState<Set<number>>(new Set());
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const availableBrands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products]
  );

  const result = useMemo(() => {
    let list = products.filter((p) => {
      if (brands.size && !brands.has(p.brand)) return false;
      if (minRating && p.rating < minRating) return false;
      if (buckets.size) {
        const ok = Array.from(buckets).some((i) => p.price >= PRICE_BUCKETS[i].min && p.price < PRICE_BUCKETS[i].max);
        if (!ok) return false;
      }
      return true;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "discount": {
        const d = (p: Product) => (p.mrp - p.price) / p.mrp;
        list = [...list].sort((a, b) => d(b) - d(a));
        break;
      }
      default:
        list = [...list].sort((a, b) => b.ratingCount - a.ratingCount);
    }
    return list;
  }, [products, brands, buckets, minRating, sort]);

  const toggleBrand = (b: string) =>
    setBrands((s) => {
      const n = new Set(s);
      n.has(b) ? n.delete(b) : n.add(b);
      return n;
    });
  const toggleBucket = (i: number) =>
    setBuckets((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });

  const activeCount = brands.size + buckets.size + (minRating ? 1 : 0);
  const clearAll = () => {
    setBrands(new Set());
    setBuckets(new Set());
    setMinRating(0);
  };

  const Filters = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Filters</h3>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs font-bold text-blue-600 hover:underline">
            CLEAR ALL
          </button>
        )}
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-slate-800">Price</h4>
        {PRICE_BUCKETS.map((b, i) => (
          <label key={b.label} className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={buckets.has(i)}
              onChange={() => toggleBucket(i)}
              className="h-4 w-4 rounded border-slate-300 accent-blue-600"
            />
            {b.label}
          </label>
        ))}
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-slate-800">Brand</h4>
        <div className="max-h-52 space-y-0.5 overflow-y-auto pr-1">
          {availableBrands.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={brands.has(b)}
                onChange={() => toggleBrand(b)}
                className="h-4 w-4 rounded border-slate-300 accent-blue-600"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-slate-800">Customer Rating</h4>
        {[4.5, 4, 3.5, 3].map((r) => (
          <label key={r} className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-slate-600">
            <input
              type="radio"
              name="rating"
              checked={minRating === r}
              onChange={() => setMinRating(minRating === r ? 0 : r)}
              className="h-4 w-4 accent-blue-600"
            />
            {r}★ &amp; above
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 md:text-2xl">{title}</h1>
          <p className="text-sm text-slate-500">
            Showing <b>{result.length}</b> {result.length === 1 ? "result" : "results"}
            {activeCount > 0 && <span className="text-blue-600"> · {activeCount} filter(s) applied</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 lg:hidden"
          >
            Filters {activeCount > 0 && <span className="rounded-full bg-blue-600 px-1.5 text-xs text-white">{activeCount}</span>}
            <ChevronDown className={`h-4 w-4 transition ${showFilters ? "rotate-180" : ""}`} />
          </button>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-4 pr-9 text-sm font-semibold text-slate-700 outline-none focus:border-blue-400"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  Sort: {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <aside className="hidden w-60 shrink-0 self-start rounded-2xl bg-white p-5 ring-1 ring-slate-100 card-3d lg:block">
          {Filters}
        </aside>

        {showFilters && (
          <div className="fixed inset-0 z-[75] lg:hidden">
            <div className="absolute inset-0 bg-slate-900/40" onClick={() => setShowFilters(false)} />
            <div className="animate-fade-up absolute inset-x-0 bottom-0 max-h-[75vh] overflow-y-auto rounded-t-2xl bg-white p-5">
              {Filters}
              <button
                onClick={() => setShowFilters(false)}
                className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white"
              >
                Show {result.length} results
              </button>
            </div>
          </div>
        )}

        <div className="flex-1">
          {result.length === 0 ? (
            <div className="grid place-items-center rounded-2xl bg-white p-16 text-center ring-1 ring-slate-100 card-3d">
              <p className="text-5xl">🔍</p>
              <h2 className="mt-4 text-lg font-bold text-slate-800">No results found</h2>
              <p className="mt-1 text-sm text-slate-500">Try removing some filters or searching for something else.</p>
              <button onClick={clearAll} className="mt-5 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {result.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
