import React from "react";
import styles from "./CategoryProduct.module.css";
import Image from "next/image";
import { Product } from "@/types/entities";
import Link from "next/link";
import Button, { ButtonType } from "../common/Button/Button";

interface CategoryProductProps {
  product: Product;
}

const CategoryProductCard: React.FC<CategoryProductProps> = ({ product }) => {
  return (
    <div className={styles.categoryProduct}>
      <div className={styles.categoryProductImage}>
        <Image
          src={product.baseImage}
          alt={product.slug}
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
          quality={100}
        />
      </div>
      <div className={styles.categoryProductText}>
        {product.recentlyAdded && (
          <h4 className={styles.recentlyAddedLabel}>NEW PRODUCT</h4>
        )}
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <Link
          style={{ textDecoration: "none" }}
          href={`/product/${product.slug}`}
        >
          <Button buttonType={ButtonType.PRIMARY} text="SEE PRODUCT" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryProductCard;
