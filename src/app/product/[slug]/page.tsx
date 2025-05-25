import ProductCard from "@/components/Product/ProductCard/ProductCard";
import { getProductBySlug } from "../../../services/productService";
import CategoriesBanners from "@/components/common/CategoriesBanners/CategoriesBanners";
import ErrorCard from "@/components/ErrorCard/ErrorCard";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default async function ProductPage({
  params: { slug },
}: ProductPageProps) {
  try {
    const product = await getProductBySlug(slug);
    return (
      <>
        <ProductCard product={product} />
        <CategoriesBanners />
      </>
    );
  } catch (error) {
    return <ErrorCard />;
  }
}
