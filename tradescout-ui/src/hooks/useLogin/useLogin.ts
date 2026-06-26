import { useMutation } from "@tanstack/react-query";
import { userApiClient } from "../../api/UserApiClient";
import { useAuth } from "../useAuth/useAuth";

export const useLogin = () => {
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["passwordLogin"],
    mutationFn: userApiClient.login,
    onSuccess: (data) => login(data),
  });
};
