"use client";
import React from "react";
import styles from "@/components/Checkout/Checkout.module.css";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import { useRouter } from "next/navigation";
import Button, { ButtonType } from "@/components/common/Button/Button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Checkout() {
  const router = useRouter();

  return (
    <div className={styles.background}>
      <div className={styles.checkoutCard}>
        <Button
          buttonType={ButtonType.TEXT}
          text="Go Back"
          onClick={() => router.back()}
        />
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
