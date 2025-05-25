import React from "react";
import styles from "./CheckoutSummary.module.css";
import useCheckoutSummary from "@/hooks/useCheckoutSummary";
import ProductShowcase from "@/components/ProductShowcase/ProductShowcase";

function CheckoutSummary() {
  const { products, quantities, totalPrice, vatPrice } = useCheckoutSummary();

  return (
    <>
      <ProductShowcase products={products} quantities={quantities} />
      <div>
        <div className={styles.checkoutPriceSection}>
          <p className={styles.description}>TOTAL</p>
          <p className={styles.price}>$ {totalPrice.toFixed(2)}</p>
        </div>
        <div className={styles.checkoutPriceSection}>
          <p className={styles.description}>SHIPPING</p>
          <p className={styles.price}>FREE</p>
        </div>
        <div className={styles.checkoutPriceSection}>
          <p className={styles.description}>VAT (INCLUDED)</p>
          <p className={styles.price}>$ {vatPrice.toFixed(2)}</p>
        </div>
        <div className={styles.checkoutPriceSection}>
          <p className={styles.description}>GRAND TOTAL</p>
          <p className={styles.price}>$ {totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </>
  );
}

export default CheckoutSummary;
