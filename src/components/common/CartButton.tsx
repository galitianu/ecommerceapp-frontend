import { useState } from "react";
import Image from "next/image";

interface CartButtonProps {
  toggleCart: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ toggleCart }) => {
  return (
    <div>
      <button
        style={{
          backgroundColor: "var(--jetblack)",
          textDecoration: "none",
          cursor: "pointer",
          border: "none",
          outline: "none",
        }}
        onClick={toggleCart}
      >
        <Image
          src="/assets/shared/desktop/icon-cart.svg"
          alt="Cart"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default CartButton;
