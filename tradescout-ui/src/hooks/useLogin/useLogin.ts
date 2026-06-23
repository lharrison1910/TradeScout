import { useMutation } from "@tanstack/react-query";
import { userApiClient } from "../../api/UserApiClient";
import { useAuth } from "../useAuth/useAuth";

export const useLogin = () => {
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (body) => userApiClient.login(body),
    onSuccess: (data) => login(data),
  });
};
