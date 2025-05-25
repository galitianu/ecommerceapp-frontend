"use client";
import { CartProvider } from "@/contexts/CartContext";
import CategoryProvider from "@/contexts/CategoryContext";
import { UserProvider } from "@/contexts/UserContext";
import { PersonProvider } from "@/contexts/PersonContext";
import { SessionProvider } from "next-auth/react";
import ProductsProvider from "@/contexts/ProductContext";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <CategoryProvider>
      <SessionProvider>
        <UserProvider>
          <PersonProvider>
            <CartProvider>
              <ProductsProvider>{children}</ProductsProvider>
            </CartProvider>
          </PersonProvider>
        </UserProvider>
      </SessionProvider>
    </CategoryProvider>
  );
};
