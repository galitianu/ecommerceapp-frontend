import { useEffect } from 'react';
import { useCartContext } from '@/contexts/CartContext';
import { calculateTotalPrice, calculateVATPrice } from '@/services/cartService';
import { useSession } from 'next-auth/react';
import { useUserContext } from '@/contexts/UserContext';
import { Product } from '@/types/entities';

export default function useCheckoutSummary() {
  const { cartItems, refreshCart } = useCartContext();
  const { data: session } = useSession();
  const { user } = useUserContext();

  useEffect(() => {
    if (session && user) {
      refreshCart(session.accessToken!, user.id);
    }
  }, [session, user]);

  const totalPrice = cartItems ? calculateTotalPrice(cartItems) : 0;
  const vatPrice = cartItems ? calculateVATPrice(cartItems) : 0;

  const products: Product[] = cartItems
    ? cartItems.map((item) => item.product)
    : [];
  const quantities: number[] = cartItems
    ? cartItems.map((item) => item.quantity)
    : [];

  return { products, quantities, totalPrice, vatPrice };
}
