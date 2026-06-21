import { createContext, useContext, useMemo } from "react";
import type { User } from "../../types/User";
import { useMutation } from "@tanstack/react-query";
import { userApiClient } from "../../api/UserApiClient";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isPending: boolean;
  error: Error | null;
}

type AuthProviderProps = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isPending: false,
  error: null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    data: user,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["loginUserSession"],
    mutationFn: (payload) => userApiClient.login(payload),
  });

  const value = useMemo<AuthContextType>(
    () => ({
      user: user ?? null,
      isAuthenticated: !!user,
      isPending,
      error,
    }),
    [user, isPending, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
