"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { formatINR } from "@/lib/data";
import { CheckIcon } from "@/components/icons";

export default function SuccessPage() {
  const { ready, orders } = useStore();
  const [eta, setEta] = useState<string>("");

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    setEta(d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }));
  }, []);

  if (!ready) return null;

  const order = orders[0];

  if (!order) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
        <p className="text-7xl">🧐</p>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">No recent order found</h1>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-center md:px-6">
      <div className="animate-pop mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-2xl shadow-emerald-500/30">
        <CheckIcon className="h-12 w-12 text-white" />
      </div>

      <h1 className="mt-6 text-3xl font-extrabold text-slate-900">Order Confirmed! 🎉</h1>
      <p className="mt-2 text-sm text-slate-500">
        Thanks for shopping with tvc0.pro — a confirmation has been sent to your email.
      </p>

      <div className="mt-8 rounded-3xl bg-white p-6 text-left ring-1 ring-slate-100 card-3d">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Order ID", order.id],
            ["Placed on", order.date],
            ["Payment", order.payment],
            ["Order Total", formatINR(order.total)],
            ["Items", `${order.items.reduce((s, i) => s + i.qty, 0)} item(s)`],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-xs uppercase tracking-wider text-slate-400">{k}</p>
              <p className="mt-0.5 text-sm font-bold text-slate-800">{v}</p>
            </div>
          ))}
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">Expected Delivery</p>
            <p className="mt-0.5 text-sm font-bold text-emerald-600">{eta || "—"}</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-400">Delivering to</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">{order.address.name} · {order.address.type} address</p>
          <p className="text-sm text-slate-500">
            {order.address.line1}, {order.address.line2 ? order.address.line2 + ", " : ""}
            {order.address.city}, {order.address.state} — {order.address.pin}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/orders"
          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110"
        >
          View My Orders
        </Link>
        <Link
          href="/"
          className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
