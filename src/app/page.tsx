import CategoriesBanners from "../components/common/CategoriesBanners/CategoriesBanners";
import HeroCard from "@/components/Home/HeroCard/HeroCard";
import FeaturedProductsCard from "@/components/Home/FeaturedProductsCard/FeaturedProductsCard";
import { getProductHero, getProductsFeatured } from "@/services/productService";
import { Product } from "@/types/entities";
export const dynamic = "force-dynamic";

export default async function Home() {
  const heroProduct: Product | null = await getProductHero();
  const featuredProducts: Product[] = await getProductsFeatured();

  return (
    <main>
      <HeroCard heroProduct={heroProduct} />
      <CategoriesBanners />
      <FeaturedProductsCard featuredProducts={featuredProducts} />
    </main>
  );
}
