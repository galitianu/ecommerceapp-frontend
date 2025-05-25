import React, { useState } from "react";
import { Order } from "@/types/entities";
import styles from "@/components/Orders/Orders.module.css";
import OrderCard from "./OrderCard";

interface OrdersListProps {
  orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className={styles.ordersList}>
      <ul className={styles.ordersWrapper}>
        {currentOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ul>
      <div className={styles.pagination}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          PREVIOUS
        </button>
        <span className={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default OrdersList;
