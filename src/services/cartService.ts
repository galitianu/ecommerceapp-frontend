import { CartItem } from "@/types/entities";
import { api } from "@/api/api";
import { normalizeProductImagePaths } from "./productService";

export const patchCartItem = async (
  accessToken: string,
  userId: string,
  productId: string,
  quantity: number
): Promise<CartItem | null> => {
  const url = `/users/${userId}/cart/items?productID=${productId}&quantity=${quantity}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const result = await api.patch<CartItem>(url, null, { headers });
  if (result.data) {
    return result.data;
  }

  return null;
};

export const getCartItems = async (
  accessToken: string,
  userId: string
): Promise<CartItem[] | null> => {
  const url = `/users/${userId}/cart/items`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const result = await api.get<CartItem[]>(url, { headers });
    if (result.data) {
      // Normalize product images for each cart item
      const normalizedCartItems = result.data.map((cartItem) => {
        cartItem.product = normalizeProductImagePaths(cartItem.product);
        return cartItem;
      });
      return normalizedCartItems;
    }
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }

  return null;
};

export const removeAllCartItems = async (
  accessToken: string,
  userId: string
): Promise<boolean> => {
  const url = `/users/${userId}/cart/items`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const result = await api.delete(url, { headers });
    if (result.status === 204) {
      // 204 No Content means items were removed successfully
      return true;
    }
  } catch (error) {
    console.error("Error removing all cart items:", error);
  }

  return false;
};

export const removeCartItem = async (
  accessToken: string,
  userId: string,
  cartItemId: string
): Promise<boolean> => {
  const url = `/users/${userId}/cart/items/${cartItemId}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const result = await api.delete(url, { headers });
    if (result.status === 204) {
      // 204 No Content means the item was removed successfully
      return true;
    }
  } catch (error) {
    console.error("Error removing cart item:", error);
  }

  return false;
};

export const calculateTotalPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
};

export const calculateVATPrice = (cartItems: CartItem[]): number => {
  return (
    cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ) * 0.09
  );
};
