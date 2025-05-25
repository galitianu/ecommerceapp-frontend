import { Person } from "@/types/entities"; // Import your Person type
import { api } from "@/api/api"; // Import your API instance

export const fetchSelfPerson = async (accessToken: string, userId: string): Promise<Person | null> => {
        const result = await api.get<Person>(`/users/${userId}/person`, {  
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        
        return result.data;
};
