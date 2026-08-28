"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { getProduct, formatINR } from "@/lib/data";

export default function OrdersPage() {
  const { ready, orders } = useStore();

  if (!ready) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
        <p className="text-7xl">📦</p>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">No orders yet</h1>
        <p className="mt-1 text-sm text-slate-500">When you place an order, it shows up here with live status.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
      <h1 className="text-2xl font-extrabold text-slate-900">My Orders</h1>
      <p className="mt-1 text-sm text-slate-500">{orders.length} order(s) placed on tvc0.pro</p>

      <div className="mt-6 space-y-5">
        {orders.map((o) => {
          const eta = new Date();
          eta.setDate(eta.getDate() + 4);
          return (
            <div key={o.id} className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 card-3d">
              <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-slate-50/60 px-5 py-3.5">
                <div>
                  <p className="text-xs text-slate-400">Order ID</p>
                  <p className="text-sm font-bold text-slate-800">{o.id}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs text-slate-400">Placed on</p>
                  <p className="text-sm font-medium text-slate-700">{o.date}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs text-slate-400">Payment</p>
                  <p className="text-sm font-medium text-slate-700">{o.payment}</p>
                </div>
                <span className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  ✓ {o.status}
                </span>
              </div>

              {/* progress */}
              <div className="flex items-center gap-2 px-5 pt-5">
                {["Confirmed", "Packed", "Shipped", "Out for delivery"].map((s, i) => (
                  <div key={s} className="flex flex-1 items-center gap-2">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold ${i === 0 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                        {i === 0 ? "✓" : i + 1}
                      </span>
                      <span className={`whitespace-nowrap text-[10px] font-semibold ${i === 0 ? "text-blue-700" : "text-slate-400"}`}>{s}</span>
                    </div>
                    {i < 3 && <span className={`mb-4 h-1 flex-1 rounded-full ${i === 0 ? "bg-blue-600" : "bg-slate-100"}`} />}
                  </div>
                ))}
              </div>

              <div className="space-y-4 p-5">
                {o.items.map((i) => {
                  const p = getProduct(i.id);
                  if (!p) return null;
                  return (
                    <div key={i.id} className="flex items-center gap-4">
                      <Link href={`/product/${p.id}`} className={`grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${p.tint} text-3xl`}>
                        {p.emoji}
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link href={`/product/${p.id}`} className="clamp-2 text-sm font-medium text-slate-800 hover:text-blue-700">
                          {p.title}
                        </Link>
                        <p className="text-xs text-slate-400">Qty {i.qty} · {formatINR(i.price)} each</p>
                      </div>
                      <span className="text-sm font-bold text-slate-800">{formatINR(i.price * i.qty)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-3.5 text-sm">
                <p className="text-slate-500">
                  Delivering to <b className="text-slate-700">{o.address.name}</b>, {o.address.city} · ETA{" "}
                  <b className="text-emerald-700">{eta.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</b>
                </p>
                <p className="font-bold text-slate-900">Total: {formatINR(o.total)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
