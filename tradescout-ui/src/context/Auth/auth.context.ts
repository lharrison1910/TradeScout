import { createContext } from "react";
import type { User } from "../../types/User";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isPending: boolean;
  error: Error | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isPending: false,
  error: null,
});
