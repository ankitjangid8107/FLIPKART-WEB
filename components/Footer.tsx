import Link from "next/link";
import { CATEGORIES } from "@/lib/data";

const COLS: { title: string; links: string[] }[] = [
  { title: "About", links: ["Contact Us", "About Us", "Careers", "tvc0.pro Stories", "Press", "Corporate Information"] },
  { title: "Help", links: ["Payments", "Shipping", "Cancellation & Returns", "FAQ", "Report Infringement"] },
  { title: "Consumer Policy", links: ["Cancellation & Returns", "Terms Of Use", "Security", "Privacy", "Sitemap", "EPR Compliance"] },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="logo-3d grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg text-white">
              🛒
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">tvc0</span>
              <span>.pro</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
            India&apos;s cleanest shopping destination — 80 million+ products, 7-day easy returns, free delivery on your
            first order and secure payments you can trust.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["UPI", "💳 Cards", "🏦 NetBanking", "💵 COD", "📱 Wallets"].map((m) => (
              <span key={m} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                {m}
              </span>
            ))}
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <span className="cursor-pointer text-sm text-slate-600 transition hover:text-blue-600">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-slate-400">
          <p>© 2026 tvc0.pro · All rights reserved</p>
          <p className="flex items-center gap-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            {CATEGORIES.slice(0, 4).map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="hover:text-blue-600">
                {c.name}
              </Link>
            ))}
          </p>
          <p>Made with 🛒 in India</p>
        </div>
      </div>
    </footer>
  );
}
