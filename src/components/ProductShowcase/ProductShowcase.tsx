import React from "react";
import styles from "./ProductShowcase.module.css";
import CartItemDetails from "@/components/common/CartContent/CartItemDetails";
import { Product } from "@/types/entities";

interface Props {
  products: Product[];
  quantities: number[];
}

const ProductShowcase: React.FC<Props> = ({ products, quantities }) => {
  return (
    <div className={styles.productsWrapper}>
      {products &&
        products.map((product, index) => (
          <div key={index} className={styles.individualProductPreview}>
            <CartItemDetails product={product} />
            <p className={styles.productQuantity}>x{quantities[index]}</p>
          </div>
        ))}
    </div>
  );
};

export default ProductShowcase;
