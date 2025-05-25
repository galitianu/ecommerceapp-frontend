import React from "react";
import styles from "./ProductCard.module.css";
import { Product } from "../../../types/entities";
import ProductPreviewCard from "../ProductPreviewCard/ProductPreviewCard";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import Link from "next/link";
import Button, { ButtonType } from "@/components/common/Button/Button";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = async ({ product }) => {
  return (
    <div className={styles.productCard}>
      <Link style={{ textDecoration: "none" }} href={`/`}>
        <Button buttonType={ButtonType.TEXT} text="Go Home" />
      </Link>
      <ProductPreviewCard product={product} />
      <ProductDetailsCard product={product} />
    </div>
  );
};

export default ProductCard;
