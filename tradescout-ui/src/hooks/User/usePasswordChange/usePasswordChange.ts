import { useMutation } from "@tanstack/react-query";
import { userApiClient } from "../../../api/UserApiClient";

export const usePasswordChange = () => useMutation({
    mutationKey: ["usePasswordChange"],
    mutationFn: () => userApiClient.
})