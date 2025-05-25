import React, { useEffect } from "react";
import CartItemContent from "./CartItemContent";
import styles from "./CartContent.module.css";
import { useSession } from "next-auth/react";
import {
  removeAllCartItems,
  calculateTotalPrice,
} from "@/services/cartService";
import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";
import Button, { ButtonType } from "../Button/Button";
import Link from "next/link";
import useRequireAuth from "@/hooks/useRequireAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface CartContentProps {
  setIsCartOpen: (isOpen: boolean) => void;
}

function CartContent({ setIsCartOpen }: CartContentProps) {
  const { cartItems, refreshCart, deleteAllCartItems } = useCartContext();
  const { data: session } = useSession();
  const { user } = useUserContext();
  useRequireAuth();

  useEffect(() => {
    if (session && user) {
      refreshCart(session.accessToken!, user.id);
    }
  }, [session, user]);

  const removeAllItems = async () => {
    if (session && user) {
      try {
        const success = await removeAllCartItems(session.accessToken!, user.id);
        if (success) {
          deleteAllCartItems();
          refreshCart(session.accessToken!, user.id);
        }
      } catch (error) {
        console.error("Error removing all items:", error);
      }
    }
  };

  const totalPrice = cartItems ? calculateTotalPrice(cartItems) : 0;

  return (
    <div className={styles.cartContent}>
      <button
        onClick={() => setIsCartOpen(false)}
        className={styles.closeButton}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className={styles.cartCounterAndRemoveAll}>
        <p>CART ({cartItems ? cartItems.length : 0})</p>
        <button onClick={removeAllItems}>Remove all</button>
      </div>
      <div className={styles.cartItems}>
        {cartItems &&
          cartItems.map((item) => (
            <CartItemContent key={item.product.id} cartItem={item} />
          ))}
      </div>
      <div className={styles.cartTotal}>
        <p className={styles.paragraph}>TOTAL</p>
        <p>$ {totalPrice.toFixed(2)}</p>
      </div>
      <div className={styles.buttonDiv}>
        <Link href={`/checkout`}>
          <Button
            buttonType={ButtonType.PRIMARY}
            text="CHECKOUT"
            onClick={() => setIsCartOpen(false)}
          />
        </Link>
      </div>
    </div>
  );
}

export default CartContent;
