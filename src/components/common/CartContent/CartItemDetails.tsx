import React from "react";
import Image from "next/image";
import styles from "./CartItemContent.module.css";

interface CartItemDetailsProps {
  product: {
    baseImage: string;
    name: string;
    price: number;
    slug: string;
  };
}

const CartItemDetails: React.FC<CartItemDetailsProps> = ({ product }) => {
  return (
    <>
      <div className={styles.cartItemContentImage}>
        <Image
          src={product.baseImage}
          alt="Best Gear"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
          quality={100}
        />
      </div>
      <div className={styles.cartItemContentDetails}>
        <p>{product.name}</p>
        <p className={styles.cartItemContentDetailsPrice}>$ {product.price}</p>
      </div>
    </>
  );
};

export default CartItemDetails;
