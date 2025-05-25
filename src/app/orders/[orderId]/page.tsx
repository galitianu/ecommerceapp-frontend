"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/Orders/Orders.module.css";
import Button, { ButtonType } from "@/components/common/Button/Button";
import ProductShowcase from "@/components/ProductShowcase/ProductShowcase";
import OrderDetailsDisplay from "@/components/Orders/OrderDetailsDisplay";
import useOrderDetails from "@/hooks/useOrderDetails";

type OrderProps = {
  params: {
    orderId: string;
  };
};

export default function OrderDetails({ params: { orderId } }: OrderProps) {
  const router = useRouter();

  const { orderItems, order, isLoading } = useOrderDetails(orderId);

  if (isLoading) {
    return (
      <div className={styles.ordersContainer}>
        <Button
          buttonType={ButtonType.TEXT}
          text="Go Back"
          onClick={() => router.back()}
        />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={styles.ordersContainer}>
      <Button
        buttonType={ButtonType.TEXT}
        text="Go Back"
        onClick={() => router.back()}
      />
      <div className={styles.orderBannerWrapper}>
        <div className={styles.orderedProducts}>
          <ProductShowcase
            products={orderItems.map((item) => item.product)}
            quantities={orderItems.map((item) => item.quantity)}
          />
        </div>
        <OrderDetailsDisplay order={order} />
      </div>
    </div>
  );
}
