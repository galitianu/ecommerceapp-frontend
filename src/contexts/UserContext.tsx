import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/entities";
import { useSession } from "next-auth/react";
import { fetchUser } from "@/services/userService";

const UserContext = createContext<
  | {
      user: User | null;
      setUser: React.Dispatch<React.SetStateAction<User | null>>;
    }
  | undefined
>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchUserData() {
      if (session?.accessToken) {
        try {
          const userData = await fetchUser(session.accessToken);
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    }

    fetchUserData();
  }, [session]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
