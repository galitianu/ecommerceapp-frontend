import React from "react";
import Image from "next/image";
import styles from "./FeaturedProductsCard.module.css";
import Button, { ButtonType } from "@/components/common/Button/Button";
import Link from "next/link";
import { Product } from "@/types/entities";

interface FeaturedProductsCardProps {
  featuredProducts: Product[];
}

const FeaturedProductsCard: React.FC<FeaturedProductsCardProps> = ({
  featuredProducts,
}) => {
  return (
    <>
      {featuredProducts.map((product) => (
        <div key={product.id} className={styles.featuredProductCard}>
          <div className={styles.featuredProductImage}>
            <Image
              src={product.baseImage}
              alt={product.name}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.featuredProductText}>
            <h4>{product.name}</h4>
            <Link
              style={{ textDecoration: "none" }}
              href={`/product/${product.slug}`}
            >
              <Button buttonType={ButtonType.SECONDARY} text="SEE PRODUCT" />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedProductsCard;
