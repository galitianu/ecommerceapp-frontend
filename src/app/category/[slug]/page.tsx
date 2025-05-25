import ErrorCard from "@/components/ErrorCard/ErrorCard";
import { Product } from "../../../types/entities";
import { getProductsByCategory } from "../../../services/productService";
import CategoryProduct from "@/components/Category/CategoryProduct";
import styles from "@/components/Category/CategoryProduct.module.css";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export default async function CategoryPage({
  params: { slug },
}: CategoryPageProps) {
  try {
    const productsByCategory = await getProductsByCategory(slug);
    if (productsByCategory.length === 0) {
      return (
        <>
          <h1 style={{ paddingTop: "4rem" }}>No Products for this category</h1>
        </>
      );
    }
    return (
      <>
        <div className={styles.horizontalLine}></div>
        <div className={styles.categoryName}>
          <h1>{slug}</h1>
        </div>
        {productsByCategory.map((relatedProduct: Product, index) => (
          <div key={index}>
            <CategoryProduct product={relatedProduct} />
          </div>
        ))}
      </>
    );
  } catch (error) {
    return <ErrorCard />;
  }
}
