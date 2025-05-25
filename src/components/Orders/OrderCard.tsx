import React from "react";
import { Order } from "@/types/entities";
import styles from "@/components/Orders/Orders.module.css";
import Link from "next/link";
import Button, { ButtonType } from "../common/Button/Button";
import { formatDate } from "@/utils/dateUtils";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <li className={styles.orderBanner} key={order.id}>
      <h3 className={styles.orderID}>
        Order ID: <br />
        {order.id}
      </h3>
      <p>
        Date:
        <span className={styles.highlighted}>
          {formatDate(order.datePlaced)}
        </span>
      </p>
      <p>
        Total:
        <span className={styles.highlighted}>$ {order.total.toFixed(2)}</span>
      </p>
      <Link
        style={{
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "1rem",
        }}
        href={`/orders/${order.id}`}
      >
        <Button buttonType={ButtonType.PRIMARY} text="SEE ORDER" />
      </Link>
    </li>
  );
};

export default OrderCard;
