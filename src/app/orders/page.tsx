"use client";
import React from "react";
import useFetchOrders from "@/hooks/useFetchOrders";
import styles from "@/components/Orders/Orders.module.css";
import Button, { ButtonType } from "@/components/common/Button/Button";
import OrdersList from "@/components/Orders/OrdersList";
import { useRouter } from "next/navigation";

function Orders() {
  const orders = useFetchOrders();
  const router = useRouter();

  return (
    <div className={styles.ordersContainer}>
      <Button
        buttonType={ButtonType.TEXT}
        text="Go Back"
        onClick={() => router.back()}
      />
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <h2>No orders to display.</h2>
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
  );
}

export default Orders;
