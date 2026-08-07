import { getAllProducts } from "@/data/products";
import HomeHeroClient from "@/components/HomeHeroClient";
import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  const products = getAllProducts();
  const featuredProduct = products[0]; // Iznik Heritage

  return (
    <>
      <HomeHeroClient featuredProduct={featuredProduct} />
      <HomeClient products={products} />
    </>
  );
}
