"use client";

import Link from "next/link";
import type { Product } from "@/lib/data";
import ProductCard from "./ProductCard";
import { ChevronRight } from "@/components/icons";

export default function ProductRow({
  title,
  subtitle,
  products,
  viewAllHref,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 card-3d">
        <div className="flex items-end justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 md:text-xl">{title}</h2>
            {subtitle && <p className="text-xs text-slate-400 md:text-sm">{subtitle}</p>}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="flex items-center gap-1 rounded-lg bg-blue-600/10 px-3 py-1.5 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white"
            >
              VIEW ALL <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
        <div className="flex gap-4 overflow-x-auto p-4 no-scrollbar">
          {products.map((p) => (
            <div key={p.id} className="w-44 shrink-0 sm:w-52">
              <ProductCard product={p} compact />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
