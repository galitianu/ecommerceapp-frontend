import React from "react";
import { Product } from "../../../types/entities";
import Image from "next/image";
import styles from "./ProductRelated.module.css";
import Link from "next/link";
import Button, { ButtonType } from "@/components/common/Button/Button";

interface ProductRelatedProps {
  product: Product;
}

const ProductRelated: React.FC<ProductRelatedProps> = ({ product }) => {
  return (
    <div className={styles.productRelated}>
      <div className={styles.productRelatedImage}>
        <Image
          src={product.baseImage}
          alt={product.slug}
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>
      <h2 className={styles.productRelatedName}>{product.name}</h2>
      <div
        style={{
          maxWidth: "11rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Link style={{ textDecoration: "none" }} href={product.slug}>
          <Button buttonType={ButtonType.PRIMARY} text="SEE PRODUCT" />
        </Link>
      </div>
    </div>
  );
};

export default ProductRelated;
