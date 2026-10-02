import { useMutation } from "@tanstack/react-query";
import { userApiClient } from "../../../api/UserApiClient";
import { useToast } from "../../useToast/useToast";

export const usePasswordChange = () => {
  const toast = useToast();

  return useMutation({
    mutationKey: ["usePasswordChange"],
    mutationFn: (payload) => userApiClient.updateUser(payload),
    onSuccess: () => {
      toast.success("Successfully reset password");
    },
  });
};
