"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, PRODUCTS, formatINR, discountPct } from "@/lib/data";
import { useStore } from "@/lib/store";
import { CartIcon, HeartIcon, SearchIcon, UserIcon, XIcon, TagIcon } from "@/components/icons";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <span className="logo-3d grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg text-white">
        🛒
      </span>
      <span className="text-xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">tvc0</span>
        <span className="text-slate-900">.pro</span>
      </span>
    </Link>
  );
}

function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const suggestions = q.trim()
    ? PRODUCTS.filter((p) => `${p.title} ${p.brand} ${p.category}`.toLowerCase().includes(q.toLowerCase())).slice(0, 7)
    : [];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const go = () => {
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div ref={boxRef} className="relative flex-1 max-w-2xl">
      <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2.5 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-blue-300">
        <SearchIcon className="h-4.5 w-4.5 text-slate-400" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && go()}
          placeholder="Search for mobiles, fashion, home & more"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear search" className="text-slate-400 hover:text-slate-600">
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-100 bg-white card-3d-lg animate-fade-up">
          {suggestions.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50"
            >
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${p.tint} text-xl`}>
                {p.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-slate-800">{p.title}</span>
                <span className="text-xs text-slate-400">in {p.brand}</span>
              </span>
              <span className="text-sm font-semibold text-slate-700">{formatINR(p.price)}</span>
            </Link>
          ))}
          <button
            onClick={go}
            className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            <SearchIcon className="h-4 w-4" /> Search for &ldquo;{q}&rdquo;
          </button>
        </div>
      )}
    </div>
  );
}

function LoginModal({ onClose }: { onClose: () => void }) {
  const { login } = useStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const valid1 = name.trim().length >= 2 && phone.trim().length === 10;
  const valid2 = otp.trim().length >= 4;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="animate-pop w-full max-w-sm overflow-hidden rounded-2xl bg-white card-3d-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 px-6 py-6 text-white">
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-white/80 hover:text-white">
            <XIcon className="h-5 w-5" />
          </button>
          <div className="logo-3d mb-3 grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-2xl backdrop-blur">
            🛒
          </div>
          <h2 className="text-lg font-bold">Login to tvc0.pro</h2>
          <p className="mt-0.5 text-sm text-white/80">
            {step === 1 ? "Get exclusive deals & faster checkout" : `OTP sent to +91 ${phone}`}
          </p>
        </div>

        <div className="space-y-4 p-6">
          {step === 1 ? (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              <div className="flex items-center rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="pl-4 pr-2 text-sm font-medium text-slate-500">+91</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  className="w-full rounded-r-xl py-3 pr-4 text-sm outline-none"
                />
              </div>
              <button
                disabled={!valid1}
                onClick={() => setStep(2)}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter OTP (any 4 digits)"
                inputMode="numeric"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-lg font-bold tracking-[0.5em] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              <button
                disabled={!valid2}
                onClick={() => {
                  login(name.trim());
                  onClose();
                }}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Verify &amp; Continue
              </button>
            </>
          )}
          <p className="text-center text-xs leading-5 text-slate-400">
            By continuing, you agree to tvc0.pro&apos;s <span className="text-blue-600">Terms of Use</span> and{" "}
            <span className="text-blue-600">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { cartCount, wishlist, user, logout } = useStore();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[60] border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 md:gap-6 md:px-6">
          <Logo />
          <div className="hidden flex-1 md:block">
            <SearchBar />
          </div>
          <div className="flex flex-1 justify-end items-center gap-1.5 md:gap-3 md:flex-none">
            {user ? (
              <div className="group relative">
                <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
                    {user.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden lg:block">{user.split(" ")[0]}</span>
                </button>
                <div className="invisible absolute right-0 top-full z-50 w-44 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-xl border border-slate-100 bg-white py-1 card-3d-lg">
                    <Link href="/orders" className="block px-4 py-2.5 text-sm hover:bg-slate-50">My Orders</Link>
                    <Link href="/wishlist" className="block px-4 py-2.5 text-sm hover:bg-slate-50">Wishlist</Link>
                    <button onClick={logout} className="block w-full px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition hover:brightness-110"
              >
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:block">Login</span>
              </button>
            )}

            <Link
              href="/wishlist"
              className="relative rounded-xl p-2.5 text-slate-600 hover:bg-slate-100"
              aria-label="Wishlist"
            >
              <HeartIcon className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <span className="relative">
                <CartIcon className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </span>
              <span className="hidden sm:block">Cart</span>
            </Link>
          </div>
        </div>

        {/* mobile search */}
        <div className="px-4 pb-2.5 md:hidden">
          <SearchBar />
        </div>

        {/* category nav */}
        <nav className="hidden border-t border-slate-100 md:block">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 md:px-6">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700"
            >
              Home
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              >
                <span aria-hidden>{c.emoji}</span> {c.name}
              </Link>
            ))}
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              <TagIcon className="h-3.5 w-3.5" /> Up to 70% off across categories
            </span>
          </div>
        </nav>

        {/* mobile category chips */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-2 no-scrollbar md:hidden">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              <span aria-hidden>{c.emoji}</span> {c.name}
            </Link>
          ))}
        </div>
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
