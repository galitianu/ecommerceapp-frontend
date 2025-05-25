import { api } from "@/api/api";
import { BillingInformation, Order, OrderItem } from "@/types/entities";
import { normalizeProductImagePaths } from "./productService";

export const postOrder = async (
  accessToken: string,
  userId: string,
  billingInformation: BillingInformation
): Promise<Order> => {
  try {
    const requestData = {
      phoneNumber: billingInformation.phoneNumber,
      address: billingInformation.address,
      zipCode: billingInformation.zipCode,
      city: billingInformation.city,
      country: billingInformation.country,
      paymentOption: billingInformation.paymentOption,
    };
    const url = `users/${userId}/orders`;

    const response = await api.post(url, requestData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while posting order:", error);
    throw error;
  }
};

export const getOrderItems = async (
  accessToken: string,
  userId: string,
  orderId: string
): Promise<OrderItem[]> => {
  try {
    const url = `users/${userId}/${orderId}/orderItems`;

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const normalizedCartItems = response.data.map((orderItem: OrderItem) => {
      orderItem.product = normalizeProductImagePaths(orderItem.product);
      return orderItem;
    });
    return normalizedCartItems;
  } catch (error) {
    console.error("Error while getting order items:", error);
    throw error;
  }
};

export const getOrders = async (
  accessToken: string,
  userId: string
): Promise<Order[]> => {
  try {
    const url = `users/${userId}/orders`;

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while getting order items:", error);
    throw error;
  }
};

export const getAllOrders = async (
  accessToken: string,
  userId: string
): Promise<Order[]> => {
  try {
    const url = `orders/${userId}`;

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while getting order items:", error);
    throw error;
  }
};

export const confirmPayment = async (order: Order): Promise<Order> => {
  try {
    const url = `orders/confirm-payment`;

    const response = await api.post(url, order);

    return response.data;
  } catch (error) {
    console.error("Error while confirming payment:", error);
    throw error;
  }
};
