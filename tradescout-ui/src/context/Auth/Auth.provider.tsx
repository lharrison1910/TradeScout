import { useMemo, useState } from "react";
import { AuthContext, type AuthContextType } from "./auth.context";
import type { User } from "../../types/User";

type AuthProviderProps = { children: React.ReactNode };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(undefined);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user: user ?? null,
      isAuthenticated: !!user,
      isPending: !!user,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
