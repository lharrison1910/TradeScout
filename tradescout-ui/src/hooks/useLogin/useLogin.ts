import { useMutation } from "@tanstack/react-query";
import { userApiClient } from "../../api/UserApiClient";
import { useAuth } from "../useAuth/useAuth";
import type { LoginPayload } from "../../types/loginPayload";

export const useLogin = () => {
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["passwordLogin"],
    mutationFn: (body: LoginPayload) => userApiClient.login(body),
    onSuccess: (data) => login(data),
  });
};
