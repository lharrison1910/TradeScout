import { useMemo, useState } from "react";
import { AuthContext, type AuthContextType } from "./auth.context";
import type { User } from "../../types/User";

type AuthProviderProps = { children: React.ReactNode };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [selectedBusiness, setSelectedBusiness] = useState<string>("");

  const login = (newUser: User) => {
    setUser(newUser);
    setSelectedBusiness(newUser.businesses[0].id);
  };

  const updateSelectedBusiness = (newBusiness: string) =>
    setSelectedBusiness(newBusiness);

  const logout = () => {
    setUser(undefined);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user: user ?? null,
      selectedBusiness,
      updateSelectedBusiness,
      isAuthenticated: !!user,
      isPending: !!user,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
