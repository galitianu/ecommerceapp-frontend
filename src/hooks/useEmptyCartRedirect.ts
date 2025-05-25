import { useCartContext } from "@/contexts/CartContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function useEmptyCartRedirect() {
  const { cartItems } = useCartContext();
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (cartItems != null && cartItems.length === 0) {
        toast.error("Your cart is empty.");
        router.push("/");
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [cartItems, router]);
}
