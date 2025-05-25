"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./QuantitySelectorCard.module.css";
import { Product } from "../../../types/entities";
import { patchCartItem } from "@/services/cartService";
import { useSession } from "next-auth/react";
import { useUserContext } from "@/contexts/UserContext";
import Button from "@/components/common/Button/Button";
import { Toaster, toast } from "react-hot-toast";

interface QuantitySelectorCardProps {
  product: Product;
}

const QuantitySelectorCard: React.FC<QuantitySelectorCardProps> = ({
  product,
}) => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [quantity, setQuantity] = useState(1);

  const { user } = useUserContext();

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const patchAProduct = async () => {
    if (status === "unauthenticated") {
      router.push("/auth");
      return;
    }
    try {
      if (!session) {
        throw new Error("Session is null");
      }
      await patchCartItem(session.accessToken!, user!.id, product.id, quantity);
      toast.success("Product added to cart");
    } catch (error: any) {
      if (error.response.status == 403) {
        toast.error("Unable to add disabled product to cart.");
        router.refresh();
      } else {
        toast.error("Unable to add product to cart");
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.quantitySelectorCard}>
      <div className={styles.quantityContainer}>
        <button className={styles.quantityButton} onClick={decreaseQuantity}>
          -
        </button>
        <div className={styles.quantityText}>{quantity}</div>
        <button className={styles.quantityButton} onClick={increaseQuantity}>
          +
        </button>
      </div>
      <Button text="ADD TO CART" onClick={patchAProduct} />
    </div>
  );
};

export default QuantitySelectorCard;
