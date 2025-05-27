"use client";
import React from "react";
import styles from "@/components/Orders/Orders.module.css";
import adminStyles from "@/components/Admin/AdminPanel.module.css";
import Button, { ButtonType } from "@/components/common/Button/Button";
import { useRouter } from "next/navigation";
import useCheckAdmin from "@/hooks/useCheckAdmin";
import OptionCard from "@/components/Admin/OptionCard";

function AdminPanel() {
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
      <h1>Sellers Dashboard</h1>
      <div className={adminStyles.cards}>
        {/* <OptionCard
          icon="/assets/shared/desktop/category.svg"
          name="Manage Categories"
          description="Add, update, and disable product categories."
          route="/admin/categories"
          buttonText="Manage"
        /> */}
        <OptionCard
          icon="/assets/shared/desktop/product.svg"
          name="Manage Products"
          description="Add, update, and disable products from your store."
          route="/admin/products"
          buttonText="Manage"
        />
        <OptionCard
          icon="/assets/shared/desktop/icon-cart.svg"
          name="View All Orders"
          description="Access an overview of all customer orders."
          route="/admin/orders"
          buttonText="View"
        />
      </div>
    </div>
  );
}

export default AdminPanel;
