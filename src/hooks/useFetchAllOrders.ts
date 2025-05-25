import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getAllOrders } from "@/services/orderService";
import toast from "react-hot-toast";
import { Order } from "@/types/entities";
import useRequireAuth from "./useRequireAuth";
import useCheckAdmin from "./useCheckAdmin";
import { useUserContext } from "@/contexts/UserContext";

export default function useFetchAllOrders() {
  const { status, data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();
  const { user } = useUserContext();
  const isAdmin = useCheckAdmin();

  useRequireAuth();

  useEffect(() => {
    const fetchOrders = () => {
      if (!session?.accessToken || !user?.id) {
        return;
      }

      getAllOrders(session.accessToken, user.id)
        .then((orders) => {
          setOrders(orders);
        })
        .catch((error) => {
          console.error("Error while fetching all orders:", error);
          toast.error("Error while fetching all orders");
        });
    };

    if (isAdmin) {
      fetchOrders();
      const intervalId = setInterval(fetchOrders, 60000);
      return () => clearInterval(intervalId);
    }
  }, [status, session, isAdmin, router, user]);

  return orders;
}
