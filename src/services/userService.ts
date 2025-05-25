import { User } from "@/types/entities";
import { api } from "@/api/api";
import axios, { AxiosError, AxiosResponse } from "axios";

export const fetchUser = async (accessToken: string): Promise<User | null> => {
  const result = await api.get<User>("/users/self", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return result.data;
};

export const createUser = async (
  lastName: string,
  firstName: string,
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const queryParams = new URLSearchParams({
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: password,
    });
    const response: AxiosResponse<User> = await api.post(
      `/users?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 409) {
        throw new Error("User already exists");
      }
    }
    return null;
  }
};
