import { useQuery } from "@tanstack/react-query";
import { userApiClient } from "../../api/UserApiClient";

export const useGetUser = () =>
  useQuery({
    queryKey: ["useGetUser"],
    queryFn: () => userApiClient.getUser(),
  });
