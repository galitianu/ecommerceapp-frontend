import { getCartItems } from "@/services/cartService";
import { CartItem } from "@/types/entities";
import { createContext, useContext, ReactNode, useState } from "react";

interface CartContextProps {
  cartItems: CartItem[] | null;
  loading: boolean;
  refreshCart: (accessToken: string, userId: string) => void;
  deleteAllCartItems: () => void;
  setLoading: (state: boolean) => void;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCartItems = async (accessToken: string, userId: string) => {
    try {
      setLoading(true);
      const items = await getCartItems(accessToken, userId);
      setCartItems(items);
    } catch (error: any) {
      console.error("An error occurred: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshCart = (accessToken: string, userId: string) => {
    fetchCartItems(accessToken, userId);
  };

  const deleteAllCartItems = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        refreshCart,
        deleteAllCartItems,
        setLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
