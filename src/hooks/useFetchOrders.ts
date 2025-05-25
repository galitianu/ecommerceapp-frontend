import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getOrders } from "@/services/orderService";
import toast from "react-hot-toast";
import { useUserContext } from "@/contexts/UserContext";
import { Order } from "@/types/entities";
import useRequireAuth from "./useRequireAuth";

export default function useFetchOrders() {
  const { status, data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useUserContext();
  const router = useRouter();

  useRequireAuth();

  useEffect(() => {
    const fetchOrders = () => {
      if (!session?.accessToken || !user?.id) {
        return;
      }

      getOrders(session.accessToken, user.id)
        .then((orders) => {
          setOrders(orders);
        })
        .catch((error) => {
          console.error("Error while fetching orders:", error);
          toast.error("Error while fetching orders");
        });
    };

    fetchOrders();

    const intervalId = setInterval(fetchOrders, 60000);

    return () => clearInterval(intervalId);
  }, [status, session, user, router]);

  return orders;
}
