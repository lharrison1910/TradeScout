import { useEffect, useMemo, useState } from "react";
import { AuthContext, type AuthContextType } from "./auth.context";
import type { User } from "../../types/User";
import { setAccessToken } from "../../api/BaseApi";
import { userApiClient } from "../../api/UserApiClient";

type AuthProviderProps = { children: React.ReactNode };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [selectedBusiness, setSelectedBusiness] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const login = (data: { accessToken: string; user: User }) => {
    const { accessToken, user } = data;
    setAccessToken(accessToken);
    setUser(user);
    setSelectedBusiness(user.businesses[0].id);
  };

  const updateSelectedBusiness = (newBusiness: string) =>
    setSelectedBusiness(newBusiness);

  const logout = () => {
    setAccessToken(null);
    setUser(undefined);
  };

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const data = await userApiClient.refresh();
        setAccessToken(data.accessToken);

        const profile = await userApiClient.me();
        setUser(profile);
        setSelectedBusiness(profile.businesses[0].id);
      } catch (_error) {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user: user ?? null,
      selectedBusiness,
      updateSelectedBusiness,
      isAuthenticated: !!user,
      isPending: !!user,
      login,
      logout,
      loading,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
