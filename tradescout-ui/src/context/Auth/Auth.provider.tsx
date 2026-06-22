import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { userApiClient } from "../../api/UserApiClient";
import { AuthContext, type AuthContextType } from "./auth.context";

type AuthProviderProps = { children: React.ReactNode };

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
