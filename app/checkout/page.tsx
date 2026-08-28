"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore, type Address } from "@/lib/store";
import { getProduct, formatINR } from "@/lib/data";
import { CheckIcon, HomeIcon } from "@/components/icons";

const PAYMENTS = [
  { id: "UPI", label: "UPI", desc: "Pay via GPay, PhonePe, Paytm & more", icon: "📱", instant: true },
  { id: "Card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay, Amex", icon: "💳" },
  { id: "NetBanking", label: "Net Banking", desc: "All major banks supported", icon: "🏦" },
  { id: "COD", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: "💵" },
];

const STATES = ["Karnataka", "Maharashtra", "Delhi", "Tamil Nadu", "Telangana", "Gujarat", "West Bengal", "Rajasthan"];

export default function CheckoutPage() {
  const router = useRouter();
  const { ready, cart, user, cartTotals, placeOrder } = useStore();
  const [addr, setAddr] = useState<Address>({
    name: user ?? "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "Karnataka",
    pin: "",
    type: "Home",
  });
  const [payment, setPayment] = useState("UPI");
  const [errors, setErrors] = useState<string[]>([]);

  if (!ready) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-slate-400 md:px-6">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
        <p className="text-7xl">📦</p>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Nothing to check out</h1>
        <p className="mt-1 text-sm text-slate-500">Your cart is empty — add something you love first.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const t = cartTotals();

  const validate = (): boolean => {
    const e: string[] = [];
    if (addr.name.trim().length < 2) e.push("Name is required");
    if (addr.phone.length !== 10) e.push("Phone must be 10 digits");
    if (addr.line1.trim().length < 5) e.push("Address line 1 is required");
    if (addr.city.trim().length < 2) e.push("City is required");
    if (addr.pin.length !== 6) e.push("PIN code must be 6 digits");
    setErrors(e);
    return e.length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    placeOrder(addr, payment);
    router.push("/success");
  };

  const field =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {/* 1 — account */}
          <Step n={1} title="Account">
            <div className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                {(user ?? "G").charAt(0).toUpperCase()}
              </span>
              <div>
                <p className="font-semibold text-slate-800">{user ? user : "Guest Checkout"}</p>
                <p className="text-xs text-slate-500">{user ? "Logged in to tvc0.pro" : "Login for faster checkout next time"}</p>
              </div>
            </div>
          </Step>

          {/* 2 — address */}
          <Step n={2} title="Delivery Address">
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input className={field} placeholder="Full name" value={addr.name} onChange={(e) => setAddr({ ...addr, name: e.target.value })} />
                <input className={field} placeholder="10-digit mobile number" inputMode="numeric" value={addr.phone} onChange={(e) => setAddr({ ...addr, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} />
              </div>
              <input className={field} placeholder="Flat / House no., Building, Street" value={addr.line1} onChange={(e) => setAddr({ ...addr, line1: e.target.value })} />
              <input className={field} placeholder="Area, Landmark (optional)" value={addr.line2} onChange={(e) => setAddr({ ...addr, line2: e.target.value })} />
              <div className="grid gap-3 sm:grid-cols-3">
                <input className={field} placeholder="City / Town" value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} />
                <select className={field} value={addr.state} onChange={(e) => setAddr({ ...addr, state: e.target.value })}>
                  {STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
                <input className={field} placeholder="PIN code" inputMode="numeric" value={addr.pin} onChange={(e) => setAddr({ ...addr, pin: e.target.value.replace(/\D/g, "").slice(0, 6) })} />
              </div>
              <div className="flex gap-2">
                {(["Home", "Work"] as const).map((tp) => (
                  <button
                    key={tp}
                    onClick={() => setAddr({ ...addr, type: tp })}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold ring-1 transition ${
                      addr.type === tp ? "bg-blue-50 text-blue-700 ring-blue-300" : "text-slate-500 ring-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {tp === "Home" ? <HomeIcon className="h-4 w-4" /> : "🏢"} {tp}
                  </button>
                ))}
              </div>
            </div>
          </Step>

          {/* 3 — payment */}
          <Step n={3} title="Payment Options">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {PAYMENTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPayment(p.id)}
                  className={`flex items-start gap-3 rounded-xl p-4 text-left ring-1 transition ${
                    payment === p.id ? "bg-blue-50/60 ring-blue-400" : "ring-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-xl ring-1 ring-slate-100">
                    {p.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      {p.label}
                      {p.instant && <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">INSTANT</span>}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">{p.desc}</span>
                  </span>
                  <span className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full ring-2 transition ${payment === p.id ? "bg-blue-600 ring-blue-600" : "ring-slate-300"}`}>
                    {payment === p.id && <CheckIcon className="h-3 w-3 text-white" />}
                  </span>
                </button>
              ))}
            </div>
          </Step>

          {errors.length > 0 && (
            <div className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700 ring-1 ring-rose-200">
              <p className="font-bold">Please fix the following:</p>
              <ul className="mt-1 list-inside list-disc">
                {errors.map((e) => <li key={e}>{e}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* summary */}
        <aside className="self-start lg:sticky lg:top-28">
          <div className="rounded-2xl bg-white ring-1 ring-slate-100 card-3d">
            <p className="border-b border-slate-100 px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-400">
              Order Summary
            </p>
            <div className="max-h-64 space-y-3 overflow-y-auto px-5 py-4">
              {cart.map((i) => {
                const p = getProduct(i.id);
                if (!p) return null;
                return (
                  <div key={i.id} className="flex items-center gap-3">
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${p.tint} text-2xl`}>
                      {p.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-medium text-slate-700">{p.title}</span>
                      <span className="text-xs text-slate-400">Qty {i.qty}</span>
                    </span>
                    <span className="text-sm font-bold text-slate-800">{formatINR(p.price * i.qty)}</span>
                  </div>
                );
              })}
            </div>
            <div className="space-y-2.5 border-t border-dashed border-slate-200 px-5 py-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Items total</span><span className="font-medium text-slate-900">{formatINR(t.itemsTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className={`font-medium ${t.delivery === 0 ? "text-emerald-600" : "text-slate-900"}`}>
                  {t.delivery === 0 ? "FREE" : formatINR(t.delivery)}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2.5 text-base font-bold text-slate-900">
                <span>Payable</span><span>{formatINR(t.total)}</span>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button
                onClick={submit}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110"
              >
                {payment === "COD" ? "PLACE ORDER" : "PAY SECURELY"} · {formatINR(t.total)}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                🔒 256-bit SSL encrypted · tvc0.pro doesn&apos;t store card details
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white ring-1 ring-slate-100 card-3d">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3.5">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-bold text-white">
          {n}
        </span>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
