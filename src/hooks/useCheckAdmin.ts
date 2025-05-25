import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUserContext } from "@/contexts/UserContext";
import { checkAdminStatus } from "@/services/adminService";

export default function useCheckAdmin() {
  const { status, data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!session?.accessToken || !user?.id) {
        setLoading(false);
        return;
      }

      try {
        const adminStatus = await checkAdminStatus(
          session.accessToken,
          user.id
        );
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error("Error while checking admin status:", error);
        toast.error("Error while checking admin status");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStatus();
  }, [status, session, user, router]);

  return { isAdmin, loading };
}
