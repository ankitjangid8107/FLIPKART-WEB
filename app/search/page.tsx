import type { Metadata } from "next";
import Listing from "@/components/Listing";
import { searchProducts } from "@/lib/data";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  return (
    <div className="py-6">
      <Listing title={query ? `Results for “${query}”` : "All products"} products={searchProducts(query)} />
    </div>
  );
}
