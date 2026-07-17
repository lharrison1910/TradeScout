/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import type { User } from "../../types/User";

export interface AuthContextType {
  user: User | null;
  selectedBusiness: string;
  updateSelectedBusiness: (newBusiness: string) => void;
  isAuthenticated: boolean;
  isPending: boolean;
  login: (data: { accessToken: string; user: User }) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  selectedBusiness: "",
  updateSelectedBusiness: (_newBusiness: string) => {},
  isAuthenticated: false,
  isPending: false,
  login: (_data: { accessToken: string; user: User }) => {},
  logout: () => {},
  loading: true,
});
