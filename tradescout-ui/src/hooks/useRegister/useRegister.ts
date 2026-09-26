import { useMutation } from "@tanstack/react-query";
import { userApiClient } from "../../api/UserApiClient";
import type { RegisterPayload } from "../../types/regiserUserPayload";
import { useAuth } from "../useAuth/useAuth";
import { useNavigate } from "@tanstack/react-router";

export const useRegister = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: RegisterPayload) => userApiClient.register(body),
    mutationKey: ["register"],

    onSuccess(data) {
      login(data);

      navigate({ to: "/" });
    },
  });
};
