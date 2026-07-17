import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../useAuth/useAuth";
import { userApiClient } from "../../../api/UserApiClient";

export const useLogout = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationKey: ["useLogout"],
    mutationFn: () => userApiClient.logout(),
    onSuccess: () => {
      logout();
    },
    onError: (error) => {
      console.log(error);
      console.log("sometign went wrong");
    },
  });
};
