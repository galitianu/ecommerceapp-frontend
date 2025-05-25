import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getOrderItems } from '@/services/orderService';
import { useUserContext } from '@/contexts/UserContext';
import toast from 'react-hot-toast';
import { Order, OrderItem } from '@/types/entities';

export default function useOrderDetails(orderId: string) { 
  const { status, data: session } = useSession();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && user) {
      getOrderItems(session.accessToken!, user.id, orderId)
        .then((orderItems) => {
          setOrderItems(orderItems);
          setOrder(orderItems[0].order);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error while fetching orderItems:', error);
          toast.error('Error while fetching orderItems');
        });
    } else if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, session, user, orderId, router]);

  return { orderItems, order, isLoading };
}
