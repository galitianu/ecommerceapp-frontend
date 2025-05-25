import React from "react";
import styles from "./ProductPreviewCard.module.css";
import Image from "next/image";
import { Product } from "../../../types/entities";
import QuantitySelectorCard from "./QuantitySelectorCard";

interface ProductPreviewCardProps {
  product: Product;
}

const ProductPreviewCard: React.FC<ProductPreviewCardProps> = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat().format(product.price);

  return (
    <div className={styles.productPreviewCard}>
      <div className={styles.productPreviewCardImage}>
        <Image
          src={product.baseImage}
          alt={product.slug}
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
          quality={100}
        />
      </div>
      <div className={styles.productPreviewCardText}>
        {product.recentlyAdded && (
          <h4 className={styles.recentlyAddedLabel}>NEW PRODUCT</h4>
        )}
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h6 className={styles.productCardPrice}>$ {formattedPrice}</h6>
        {!product.disabled ? (
          <QuantitySelectorCard product={product} />
        ) : (
          <p>This product is currently unavailable.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPreviewCard;
