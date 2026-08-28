import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import { PRODUCTS, getProduct, similarProducts } from "@/lib/data";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = getProduct(id);
  return {
    title: p ? p.title : "Product",
    description: p?.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <div className="py-4">
      <ProductView product={product} similar={similarProducts(product)} />
      <div className="mx-auto mt-8 max-w-7xl px-4 text-center text-sm text-slate-400 md:px-6">
        Browse more in{" "}
        <Link href={`/category/${product.category}`} className="font-semibold capitalize text-blue-600 hover:underline">
          {product.category}
        </Link>
      </div>
    </div>
  );
}
