import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Listing from "@/components/Listing";
import { CATEGORIES, categoryProducts, getCategory } from "@/lib/data";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  return { title: cat ? `${cat.name} — Shop Online` : "Category" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  return (
    <div className="space-y-5 py-6">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className={`flex items-center gap-4 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white card-3d-lg md:p-8`}>
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 text-4xl backdrop-blur">
            {cat.emoji}
          </span>
          <div>
            <h1 className="text-2xl font-extrabold md:text-3xl">{cat.name}</h1>
            <p className="text-sm text-white/80">
              {categoryProducts(cat.slug).length} products · Free delivery · 7-day returns
            </p>
          </div>
        </div>
      </div>
      <Listing title={`All ${cat.name}`} products={categoryProducts(cat.slug)} />
    </div>
  );
}
