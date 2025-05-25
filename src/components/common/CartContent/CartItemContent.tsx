import React from "react";
import { CartItem } from "@/types/entities";
import styles from "./CartItemContent.module.css";
import { useUserContext } from "@/contexts/UserContext";
import { patchCartItem, removeCartItem } from "@/services/cartService";
import { useSession } from "next-auth/react";
import CartItemDetailsProps from "./CartItemDetails";
import { useCartContext } from "@/contexts/CartContext"; // <-- Import this
import toast from "react-hot-toast";
import axios from "axios";

interface CartItemContentProps {
  cartItem: CartItem;
}

function CartItemContent({ cartItem }: CartItemContentProps) {
  const { data: session } = useSession();
  const { user } = useUserContext();
  const { refreshCart } = useCartContext();

  const changeQuantity = async (quantity: number) => {
    if (session && user) {
      try {
        await patchCartItem(
          session.accessToken!,
          user.id,
          cartItem.product.id,
          quantity
        );
        refreshCart(session.accessToken!, user.id);
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          await removeCartItem(session.accessToken!, user.id, cartItem.id);
          refreshCart(session.accessToken!, user.id);
          toast.error(
            "Product is disabled and has been removed from your cart."
          );
        } else {
          console.error(
            `Error ${quantity < 0 ? "decreasing" : "increasing"} quantity:`,
            error.message
          );
          toast.error(error.message || "Unable to change product quantity.");
        }
      }
    }
  };

  return (
    <div className={styles.cartItemContent}>
      <CartItemDetailsProps product={cartItem.product} />
      <div className={styles.quantityContainer}>
        <button
          className={styles.quantityButton}
          onClick={() => changeQuantity(-1)}
        >
          -
        </button>
        <div className={styles.quantityText}>{cartItem.quantity}</div>
        <button
          className={styles.quantityButton}
          onClick={() => changeQuantity(+1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default CartItemContent;
