import { useMutation } from "@tanstack/react-query";
import { userApiClient } from "../../../api/UserApiClient";

export const usePutUser = () =>
  useMutation({
    mutationKey: ["usePutUser"],
    mutationFn: (payload) => userApiClient.updateUser(payload),
  });
