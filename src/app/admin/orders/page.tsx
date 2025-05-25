"use client";
import React from "react";
import styles from "@/components/Orders/Orders.module.css";
import Button, { ButtonType } from "@/components/common/Button/Button";
import OrdersList from "@/components/Orders/OrdersList";
import { useRouter } from "next/navigation";
import useFetchAllOrders from "@/hooks/useFetchAllOrders";
import useCheckAdmin from "@/hooks/useCheckAdmin";

function Orders() {
  const orders = useFetchAllOrders();
  const router = useRouter();
  const { isAdmin, loading } = useCheckAdmin();

  if (loading) {
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

  if (!isAdmin) {
    return (
      <div className={styles.ordersContainer}>
        <Button
          buttonType={ButtonType.TEXT}
          text="Go Back"
          onClick={() => router.back()}
        />
        <h1>You do not have access to this page</h1>
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
