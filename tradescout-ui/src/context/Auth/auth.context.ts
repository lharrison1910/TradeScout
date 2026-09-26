/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import type { User } from "../../types/User";

export interface AuthContextType {
  user: User | null;
  selectedBusiness: number;
  updateSelectedBusiness: (newBusiness: number) => void;
  isAuthenticated: boolean;
  isPending: boolean;
  login: (data: { accessToken: string; user: User }) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  selectedBusiness: 0,
  updateSelectedBusiness: (_newBusiness: number) => {},
  isAuthenticated: false,
  isPending: false,
  login: (_data: { accessToken: string; user: User }) => {},
  logout: () => {},
  loading: true,
});
