import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found — LOS KAREL" };

  return {
    title: `${product.name} — LOS KAREL`,
    description: product.description,
    openGraph: {
      title: `${product.name} — LOS KAREL`,
      description: product.description,
      images: [product.images.tshirt],
    },
  };
}

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const otherProducts = getAllProducts().filter((p) => p.id !== product.id);

  return <ProductDetailClient product={product} relatedProducts={otherProducts} />;
}
