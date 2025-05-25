import { Order } from "@/types/entities";

export const getOrderState = (order: Order) => {
  if (order.delivered) {
    return "Delivered";
  } else if (order.deliveryPerson) {
    return "Ongoing";
  } else {
    return "Awaiting Delivery Person";
  }
};
