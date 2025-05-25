import React, { createContext, useContext, useState, useEffect } from "react";
import { Person } from "@/types/entities";
import { useSession } from "next-auth/react";
import { fetchSelfPerson } from "@/services/personService";
import { useUserContext } from "./UserContext";

// Define the context with a precise initial state or type
const PersonContext = createContext<{
  person: Person | null;
  setPerson: React.Dispatch<React.SetStateAction<Person | null>>;
} | null>(null); // Initialize as null to signify no value yet

// Custom hook for easy context consumption
export const usePersonContext = () => {
  const context = useContext(PersonContext);
  if (!context) {
    throw new Error("usePersonContext must be used within a PersonProvider");
  }
  return context;
};

type PersonProviderProps = {
  children: React.ReactNode;
};

export const PersonProvider = ({ children }: PersonProviderProps) => {
  const [person, setPerson] = useState<Person | null>(null);
  const { user } = useUserContext(); // Assuming useUserContext correctly provides a user object
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPersonData = async () => {
      if (session?.accessToken && user?.id) {
        // Ensure user object and session token are available
        try {
          const personData = await fetchSelfPerson(
            session.accessToken,
            user.id
          );
          setPerson(personData);
        } catch (error) {
          console.error("Failed to fetch person data:", error);
        }
      }
    };

    fetchPersonData();
  }, [session?.accessToken, user?.id]); // Depend on accessToken and user.id directly

  return (
    <PersonContext.Provider value={{ person, setPerson }}>
      {children}
    </PersonContext.Provider>
  );
};
