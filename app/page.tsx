import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import ProductRow from "@/components/ProductRow";
import Countdown from "@/components/Countdown";
import ProductCard from "@/components/ProductCard";
import {
  DEALS_OF_DAY,
  PRODUCTS,
  categoryProducts,
  CATEGORIES,
} from "@/lib/data";
import { TruckIcon, ShieldIcon, RefreshIcon, SupportIcon, TagIcon } from "@/components/icons";

export default function Home() {
  const topPicks = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 10);

  return (
    <div className="space-y-6 pb-12 pt-4 md:space-y-8">
      <Hero />
      <CategoryStrip />

      {/* Deals of the day */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 card-3d">
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 md:text-xl">⚡ Deals of the Day</h2>
              <p className="text-xs text-slate-400 md:text-sm">Biggest discounts, ending tonight</p>
            </div>
            <span className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-1.5 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Ends in</span>
              <Countdown />
            </span>
            <a
              href="#categories"
              className="ml-auto hidden items-center gap-1 rounded-lg bg-blue-600/10 px-3 py-1.5 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white sm:flex"
            >
              VIEW ALL
            </a>
          </div>
          <div className="flex gap-4 overflow-x-auto p-4 no-scrollbar">
            {DEALS_OF_DAY.map((p) => (
              <div key={p.id} className="w-44 shrink-0 sm:w-52">
                <ProductCard product={p} compact />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* promo banners */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 md:px-6">
        {[
          { emoji: "💳", title: "No Cost EMI", sub: "On 3, 6 & 9 month tenures", bg: "from-blue-500 to-indigo-600" },
          { emoji: "🔁", title: "Exchange & Save", sub: "Up to ₹2,000 off on exchange", bg: "from-violet-500 to-purple-600" },
          { emoji: "🚚", title: "Free Delivery", sub: "On orders above ₹500", bg: "from-emerald-500 to-teal-600" },
        ].map((b) => (
          <div
            key={b.title}
            className={`flex items-center gap-4 rounded-2xl bg-gradient-to-r ${b.bg} p-5 text-white card-3d lift`}
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 text-3xl backdrop-blur">
              {b.emoji}
            </span>
            <div>
              <p className="text-base font-bold">{b.title}</p>
              <p className="text-sm text-white/80">{b.sub}</p>
            </div>
          </div>
        ))}
      </section>

      <ProductRow
        title="Best of Mobiles"
        subtitle="Flagships & budget kings, all in one place"
        products={categoryProducts("mobiles")}
        viewAllHref="/category/mobiles"
      />
      <ProductRow
        title="Top Picks for You"
        subtitle="Highest rated across categories"
        products={topPicks}
      />
      <ProductRow
        title="Fashion Under ₹1,999"
        subtitle="Trendy styles at irresistible prices"
        products={categoryProducts("fashion")}
        viewAllHref="/category/fashion"
      />
      <ProductRow
        title="Home & Kitchen Essentials"
        subtitle="Everything your space needs"
        products={[...categoryProducts("home"), ...categoryProducts("appliances")]}
        viewAllHref="/category/home"
      />
      <ProductRow
        title="Beauty Bestsellers"
        subtitle="Glow up for less"
        products={categoryProducts("beauty")}
        viewAllHref="/category/beauty"
      />

      {/* trust strip */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-white p-6 ring-1 ring-slate-100 card-3d md:grid-cols-4 md:p-8">
          {[
            { Icon: TruckIcon, t: "Free & Fast Delivery", s: "Across 19,000+ pin codes" },
            { Icon: ShieldIcon, t: "Secure Payments", s: "PCI-DSS compliant gateway" },
            { Icon: RefreshIcon, t: "7-Day Easy Returns", s: "No questions asked" },
            { Icon: SupportIcon, t: "24×7 Support", s: "Real humans, real help" },
          ].map(({ Icon, t, s }) => (
            <div key={t} className="flex flex-col items-center gap-2 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100">
                <Icon className="h-7 w-7 text-blue-600" />
              </span>
              <p className="text-sm font-bold text-slate-800">{t}</p>
              <p className="text-xs text-slate-400">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* category grid cta */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 p-8 text-center text-white card-3d-lg md:p-12">
          <TagIcon className="mx-auto h-8 w-8 text-blue-300" />
          <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">Shop by category, save every day</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/70 md:text-base">
            {PRODUCTS.length} curated products across {CATEGORIES.length} categories — every listing verified, every deal real.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((c) => (
              <a
                key={c.slug}
                href={`/category/${c.slug}`}
                className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
              >
                <span aria-hidden>{c.emoji}</span> {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
