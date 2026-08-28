import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, PRODUCTS, categoryProducts } from "@/lib/data";

export const metadata: Metadata = { title: "All Categories" };

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">Shop All Categories</h1>
      <p className="mt-1 text-sm text-slate-500">
        {PRODUCTS.length} curated products across {CATEGORIES.length} categories
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => {
          const items = categoryProducts(c.slug);
          const min = Math.min(...items.map((p) => p.price));
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-100 card-3d lift"
            >
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 text-3xl ring-1 ring-slate-100 transition group-hover:ring-blue-200">
                {c.emoji}
              </span>
              <div>
                <p className="font-bold text-slate-900 group-hover:text-blue-700">{c.name}</p>
                <p className="text-xs text-slate-400">{items.length} products</p>
                <p className="mt-1 text-sm font-semibold text-emerald-600">From ₹{min.toLocaleString("en-IN")}</p>
              </div>
              <span className="ml-auto text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500">→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
