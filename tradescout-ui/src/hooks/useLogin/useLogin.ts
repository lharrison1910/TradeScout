import { useMutation } from "@tanstack/react-query";
import { userApiClient } from "../../api/UserApiClient";
import { useAuth } from "../useAuth/useAuth";
import type { LoginPayload } from "../../types/loginPayload";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["passwordLogin"],
    mutationFn: (body: LoginPayload) => userApiClient.login(body),
    onSuccess: (data) => {
      login(data);
      navigate({ to: "/" });
    },
  });
};
