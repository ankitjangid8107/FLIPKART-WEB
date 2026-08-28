"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatINR, discountPct, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import ProductRow from "./ProductRow";
import { RatingPill } from "./ProductCard";
import { CheckIcon, HeartIcon, PinIcon, ShieldIcon, RefreshIcon, TagIcon } from "@/components/icons";

const TINTS = [
  "from-blue-50 to-indigo-100",
  "from-rose-50 to-pink-100",
  "from-amber-50 to-orange-100",
  "from-emerald-50 to-teal-100",
];

const REVIEWS = [
  { name: "Ananya S.", rating: 5, date: "Aug 2026", text: "Exceeded expectations for the price. Delivery was two days early and packaging was spotless. Would absolutely buy again." },
  { name: "Rahul V.", rating: 4, date: "Aug 2026", text: "Really good build quality and performance. Only minor gripe is the box contents — read the highlights carefully before ordering." },
  { name: "Meera K.", rating: 5, date: "Jul 2026", text: "Bought during the sale and the value is unbeatable. Customer support replaced a small dent issue within 24 hours. Impressive." },
];

export default function ProductView({ product, similar }: { product: Product; similar: Product[] }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [tint, setTint] = useState(TINTS[0]);
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState<string | null>(null);
  const off = discountPct(product);
  const inWishlist = wishlist.includes(product.id);

  const checkPin = () => {
    if (pin.length !== 6) {
      setPinMsg("Please enter a valid 6-digit PIN code.");
      return;
    }
    const days = 2 + (Number(pin[5]) % 3);
    const d = new Date();
    d.setDate(d.getDate() + days);
    setPinMsg(
      `Delivery by ${d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })} · Free delivery · ✓ Assured`
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <nav className="py-3 text-xs text-slate-400">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">›</span>
        <Link href={`/category/${product.category}`} className="capitalize hover:text-blue-600">{product.category}</Link>
        <span className="mx-1.5">›</span>
        <span className="text-slate-600">{product.brand}</span>
      </nav>

      <div className="grid gap-8 rounded-3xl bg-white p-5 ring-1 ring-slate-100 card-3d md:p-8 lg:grid-cols-[minmax(0,460px)_1fr]">
        {/* Gallery */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <div className={`relative grid aspect-square place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${tint}`}>
            <span className="product-art select-none text-[10rem]" role="img" aria-label={product.title}>
              {product.emoji}
            </span>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white shadow-md ring-1 ring-slate-100 transition hover:scale-110"
            >
              <HeartIcon className={`h-5 w-5 ${inWishlist ? "fill-rose-500 text-rose-500" : "text-slate-500"}`} />
            </button>
          </div>
          <div className="mt-3 flex gap-3">
            {TINTS.map((t) => (
              <button
                key={t}
                onClick={() => setTint(t)}
                aria-label="Change view"
                className={`h-16 w-16 rounded-xl bg-gradient-to-br ${t} ring-2 transition ${
                  tint === t ? "ring-blue-600" : "ring-slate-100 hover:ring-slate-300"
                }`}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                addToCart(product.id);
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600/10 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white"
            >
              🛒 ADD TO CART
            </button>
            <button
              onClick={() => {
                addToCart(product.id, 1, true);
                router.push("/checkout");
              }}
              className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:brightness-110"
            >
              ⚡ BUY NOW
            </button>
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-semibold text-slate-400">{product.brand}</p>
          <h1 className="mt-1 text-xl font-bold leading-snug text-slate-900 md:text-2xl">{product.title}</h1>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <RatingPill value={product.rating} />
            <span className="text-sm text-slate-500">{product.ratingCount.toLocaleString("en-IN")} ratings &amp; reviews</span>
            {product.assured && (
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">✓ Assured</span>
            )}
          </div>

          <div className="mt-4 rounded-2xl bg-slate-50 p-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-extrabold text-slate-900">{formatINR(product.price)}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-base text-slate-400 line-through">{formatINR(product.mrp)}</span>
                  <span className="text-base font-bold text-emerald-600">{off}% off</span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-400">Inclusive of all taxes · EMI from {formatINR(Math.round(product.price / 12))}/mo</p>
            <p className="mt-2 text-sm font-bold text-emerald-700">
              You save {formatINR(product.mrp - product.price)} on this order 🎉
            </p>
          </div>

          {/* Offers */}
          <div className="mt-5">
            <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-slate-800">
              <TagIcon className="h-4 w-4 text-emerald-600" /> Available offers
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2"><span>🏷️</span><span><b>Bank Offer</b> 10% off on HDFC Bank Credit Cards, up to ₹1,500 on orders of ₹5,000 and above</span></li>
              <li className="flex gap-2"><span>🔁</span><span><b>Exchange Offer</b> Up to ₹2,000 off on exchange of your old device</span></li>
              <li className="flex gap-2"><span>💳</span><span><b>No Cost EMI</b> on 3, 6 &amp; 9 month tenures with leading banks</span></li>
            </ul>
          </div>

          {/* Delivery */}
          <div className="mt-5 flex flex-col gap-2 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
              <PinIcon className="h-4.5 w-4.5 shrink-0 text-slate-400" />
              <input
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
                  setPinMsg(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && checkPin()}
                placeholder="Enter delivery PIN code"
                inputMode="numeric"
                className="w-full bg-transparent text-sm outline-none"
              />
              <button onClick={checkPin} className="shrink-0 text-sm font-bold text-blue-600 hover:underline">
                Check
              </button>
            </div>
          </div>
          {pinMsg && <p className="mt-2 text-sm font-semibold text-emerald-600">{pinMsg}</p>}

          {/* Highlights */}
          <div className="mt-5">
            <h3 className="mb-2 text-sm font-bold text-slate-800">Highlights</h3>
            <ul className="space-y-1.5">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className="mt-5">
            <h3 className="mb-2 text-sm font-bold text-slate-800">Description</h3>
            <p className="text-sm leading-6 text-slate-600">{product.description}</p>
          </div>

          {/* Specs */}
          <div className="mt-5">
            <h3 className="mb-2 text-sm font-bold text-slate-800">Specifications</h3>
            <div className="overflow-hidden rounded-xl ring-1 ring-slate-100">
              {[
                ["Brand", product.brand],
                ["Model", product.title.split("(")[0].trim()],
                ["Category", product.category],
                ["In the Box", "1 × Product, Manual, Warranty Card"],
                ["Warranty", "1 Year Manufacturer Warranty"],
              ].map(([k, v], i) => (
                <div key={k} className={`flex text-sm ${i % 2 ? "bg-white" : "bg-slate-50"}`}>
                  <span className="w-36 shrink-0 px-4 py-2.5 font-medium text-slate-500">{k}</span>
                  <span className="px-4 py-2.5 capitalize text-slate-800">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { Icon: TruckIconSafe, t: "Free Delivery" },
              { Icon: RefreshIcon, t: "7-Day Returns" },
              { Icon: ShieldIcon, t: "1 Yr Warranty" },
            ].map(({ Icon, t }) => (
              <div key={t} className="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-3.5 text-center">
                <Icon className="h-6 w-6 text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-6 rounded-3xl bg-white p-6 ring-1 ring-slate-100 card-3d md:p-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="text-center">
            <p className="text-4xl font-extrabold text-slate-900">{product.rating.toFixed(1)}<span className="text-lg text-slate-400">/5</span></p>
            <div className="mt-1 flex gap-0.5 text-amber-400">
              {"★★★★★".slice(0, Math.round(product.rating))}
              <span className="text-slate-200">{"★★★★★".slice(Math.round(product.rating))}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{product.ratingCount.toLocaleString("en-IN")} ratings</p>
          </div>
          <div className="flex-1 space-y-1.5 min-w-56">
            {[
              [5, 68], [4, 21], [3, 7], [2, 2], [1, 2],
            ].map(([star, pct]) => (
              <div key={star} className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-3">{star}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8">{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <div key={r.name} className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
                  {r.name[0]}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{r.name}</p>
                  <p className="text-[11px] text-slate-400">{r.date} · Verified Purchase</p>
                </div>
                <span className="ml-auto rounded-md bg-emerald-600 px-1.5 py-0.5 text-xs font-bold text-white">
                  {r.rating}★
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <ProductRow title="Similar products" products={similar} />
      </div>
    </div>
  );
}

/* TruckIcon isn't exported as value with same name — small alias to keep imports tidy */
function TruckIconSafe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}>
      <path d="M2.5 6h11v11h-11z" /><path d="M13.5 10h4.2l3.3 3.5V17h-7.5" /><circle cx="7" cy="18.6" r="1.6" /><circle cx="17" cy="18.6" r="1.6" />
    </svg>
  );
}
