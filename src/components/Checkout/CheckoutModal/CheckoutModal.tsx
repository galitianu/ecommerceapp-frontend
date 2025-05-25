import styles from "./CheckoutModal.module.css";
import itemStyle from "@/components/ProductShowcase/ProductShowcase.module.css";
import Link from "next/link";
import Image from "next/image";
import Button, { ButtonType } from "@/components/common/Button/Button";
import CartItemDetails from "@/components/common/CartContent/CartItemDetails";
import { Order, OrderItem } from "@/types/entities";

type Props = {
  order: Order;
  orderItems: OrderItem[];
};

const CheckoutModal: React.FC<Props> = ({ order, orderItems }) => {
  return (
    <>
      <div className={styles.image}>
        <Image
          src="/assets/checkout/icon-order-confirmation.svg"
          alt="Checkout Complete"
          width={50}
          height={50}
        />
      </div>
      <h1>THANK YOU FOR YOUR ORDER</h1>
      <p style={{ opacity: 0.5, paddingBottom: "0.5rem" }}>
        You will receive an email confirmation shortly.
      </p>
      <div className={`${itemStyle.productsWrapper} ${styles.modalOrderItems}`}>
        <div
          className={itemStyle.individualProductPreview}
          style={{
            padding: "1rem",
            marginBottom: "0",
          }}
        >
          <CartItemDetails product={orderItems[0].product} />
          <p className={itemStyle.productQuantity}>x{orderItems[0].quantity}</p>
        </div>
        {orderItems.length > 1 && (
          <>
            <hr className={styles.designline} />
            <p className={styles.numberOfItems}>
              and {orderItems.length - 1} other item(s)
            </p>
          </>
        )}
        <div className={styles.orderTotal}>
          <h2>GRAND TOTAL</h2>
          <p>$ {order.total}</p>
        </div>
      </div>
      <Link
        className={styles.buttonLink}
        style={{ textDecoration: "none" }}
        href={`/`}
      >
        <Button buttonType={ButtonType.PRIMARY} text="BACK TO HOME" />
      </Link>
    </>
  );
};

export default CheckoutModal;
