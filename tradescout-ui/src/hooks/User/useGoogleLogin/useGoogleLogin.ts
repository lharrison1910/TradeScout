import { useQuery } from "@tanstack/react-query";
import { userApiClient } from "../../api/UserApiClient";

export const useGoogleLogin = () => {
  return useQuery({
    queryKey: ["googleLogin"],
    queryFn: () => userApiClient.googleLogin(),
    enabled: false,
  });
};
