import { createContext } from "react";
import type { User } from "../../types/User";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isPending: boolean;
  login: (newUser: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isPending: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (_newUser: User | null) => {},
  logout: () => {}
});
