"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/data";

export default function CategoryStrip() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 card-3d">
        <div className="grid grid-cols-4 gap-y-5 px-4 py-6 sm:grid-cols-8">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group flex flex-col items-center gap-2"
            >
              <span
                className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 text-3xl ring-1 ring-slate-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-blue-500/10 group-hover:ring-blue-200`}
                style={{ transform: "translateZ(0)" }}
              >
                {c.emoji}
              </span>
              <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
