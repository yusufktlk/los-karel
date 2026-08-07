import { Metadata } from "next";
import { getAllProducts } from "@/data/products";
import CollectionHeaderClient from "@/components/CollectionHeaderClient";
import CollectionClient from "@/components/CollectionClient";

export const metadata: Metadata = {
  title: "Collection — LOS KAREL",
  description: "Explore the LOS KAREL Heritage Collection. Premium contemporary pieces inspired by Anatolian heritage and İznik artistry.",
};

export default function CollectionPage() {
  const products = getAllProducts();
  return (
    <>
      <CollectionHeaderClient />
      <div style={{ borderTop: "1px solid var(--clr-border)" }} />
      <CollectionClient products={products} />
    </>
  );
}
