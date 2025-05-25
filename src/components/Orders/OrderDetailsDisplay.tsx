import React from "react";
import styles from "./Orders.module.css";
import { formatDate } from "@/utils/dateUtils";
import { Order } from "@/types/entities";
import { getOrderState } from "@/utils/getOrderState";

type OrderDetailsProps = {
  order?: Order;
};

const OrderDetailsDisplay: React.FC<OrderDetailsProps> = ({ order }) => {
  const orderState = getOrderState(order!);
  return (
    <div className={styles.orderDetails}>
      <h3 className={styles.orderID}>
        <span className={styles.title}>Order ID</span> <br />
        {order?.id}
      </h3>
      <p>
        <span className={styles.title}>Date</span> <br />
        {formatDate(order!.datePlaced)}
      </p>
      <p>
        <span className={styles.title}>Total</span> <br />$
        {order?.total.toFixed(2)}
      </p>
      <p>
        <span className={styles.title}>Pending</span> <br />
        {order?.pending ? "Yes" : "No"}
      </p>
      <p>
        <span className={styles.title}>Delivery Status</span> <br />
        {orderState}
      </p>
      <br />
      <h3 className={styles.orderID}>
        Billing Details
        <br />
      </h3>
      <p>
        <span className={styles.title}>Phone Number</span> <br />
        {order?.billingInformation?.phoneNumber}
      </p>
      <p>
        <span className={styles.title}>E-Mail</span> <br />
        {order?.person.user.username}
      </p>
      <p>
        <span className={styles.title}>Country</span> <br />
        {order?.billingInformation?.country}
      </p>
      <p>
        <span className={styles.title}>City</span> <br />
        {order?.billingInformation?.city}
      </p>
      <p>
        <span className={styles.title}>Address</span> <br />
        {order?.billingInformation?.address}
      </p>
      <p>
        <span className={styles.title}>Zip Code</span> <br />
        {order?.billingInformation?.zipCode}
      </p>
      <p>
        <span className={styles.title}>Payment Option</span> <br />
        {order?.billingInformation?.paymentOption}
      </p>
    </div>
  );
};

export default OrderDetailsDisplay;
