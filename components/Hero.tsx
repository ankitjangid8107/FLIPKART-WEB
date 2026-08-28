"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/icons";

type Slide = {
  tag: string;
  title: string;
  sub: string;
  cta: string;
  href: string;
  bg: string;
  art: { emoji: string; chip: string; tilt: string; pos: string }[];
};

const SLIDES: Slide[] = [
  {
    tag: "BIG SAVINGS WEEKEND",
    title: "Up to 70% Off",
    sub: "Across mobiles, fashion, home & more",
    cta: "Shop Now",
    href: "/category/mobiles",
    bg: "from-blue-600 via-indigo-600 to-violet-700",
    art: [
      { emoji: "📱", chip: "₹16,999", tilt: "-8deg", pos: "top-8 right-10" },
      { emoji: "🎧", chip: "₹1,299", tilt: "6deg", pos: "bottom-10 right-40" },
      { emoji: "👟", chip: "₹1,799", tilt: "-4deg", pos: "top-24 right-56" },
    ],
  },
  {
    tag: "NEW ARRIVALS",
    title: "Latest Flagship Mobiles",
    sub: "Titanium builds, 200 MP cameras, 144 Hz displays",
    cta: "Explore Mobiles",
    href: "/category/mobiles",
    bg: "from-slate-800 via-slate-900 to-indigo-950",
    art: [
      { emoji: "📱", chip: "New", tilt: "5deg", pos: "top-10 right-16" },
      { emoji: "⌚", chip: "₹3,499", tilt: "-6deg", pos: "bottom-12 right-44" },
      { emoji: "💻", chip: "₹89,990", tilt: "3deg", pos: "top-28 right-60" },
    ],
  },
  {
    tag: "FASHION FIESTA",
    title: "Flat 50–80% Off",
    sub: "T-shirts, jeans, kurtas, shoes & more",
    cta: "Grab Deals",
    href: "/category/fashion",
    bg: "from-rose-500 via-pink-600 to-fuchsia-700",
    art: [
      { emoji: "👕", chip: "₹799", tilt: "-5deg", pos: "top-8 right-12" },
      { emoji: "👟", chip: "₹1,799", tilt: "7deg", pos: "bottom-10 right-36" },
      { emoji: "👗", chip: "₹1,499", tilt: "-3deg", pos: "top-24 right-52" },
    ],
  },
  {
    tag: "APPLIANCE MANIA",
    title: "No Cost EMI from ₹999/mo",
    sub: "ACs, washing machines, microwaves & more",
    cta: "Shop Appliances",
    href: "/category/appliances",
    bg: "from-amber-500 via-orange-500 to-rose-500",
    art: [
      { emoji: "❄️", chip: "₹34,990", tilt: "6deg", pos: "top-10 right-14" },
      { emoji: "🧺", chip: "₹27,990", tilt: "-6deg", pos: "bottom-10 right-40" },
      { emoji: "🍲", chip: "₹9,490", tilt: "4deg", pos: "top-24 right-56" },
    ],
  },
];

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % SLIDES.length), 4500);
    return () => window.clearInterval(t);
  }, []);

  const s = SLIDES[i];

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <div className={`relative h-64 overflow-hidden rounded-3xl bg-gradient-to-br ${s.bg} card-3d-lg sm:h-72 md:h-80`}>
        {/* decorative glows */}
        <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        {/* floating product cards */}
        <div key={i} className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 sm:block">
          {s.art.map((a, idx) => (
            <div
              key={idx}
              className={`absolute ${a.pos} animate-float`}
              style={{ ["--tilt" as string]: a.tilt, animationDelay: `${idx * 0.6}s` }}
            >
              <div className="flex items-center gap-2 rounded-2xl bg-white/95 p-2.5 pr-3 shadow-2xl backdrop-blur">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 text-2xl">
                  {a.emoji}
                </span>
                <span className="text-sm font-bold text-slate-800">{a.chip}</span>
              </div>
            </div>
          ))}
        </div>

        {/* copy */}
        <div key={`t-${i}`} className="animate-fade-up relative flex h-full max-w-lg flex-col justify-center gap-3 p-7 md:p-12">
          <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold tracking-widest text-white backdrop-blur">
            {s.tag}
          </span>
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-white drop-shadow-sm md:text-5xl">
            {s.title}
          </h1>
          <p className="text-sm text-white/85 md:text-lg">{s.sub}</p>
          <Link
            href={s.href}
            className="mt-1 w-fit rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-xl transition hover:scale-[1.03] hover:shadow-2xl md:text-base"
          >
            {s.cta} →
          </Link>
        </div>

        {/* arrows */}
        <button
          onClick={() => setI((i - 1 + SLIDES.length) % SLIDES.length)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35 md:grid"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => setI((i + 1) % SLIDES.length)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35 md:grid"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-white" : "w-2 bg-white/45"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
