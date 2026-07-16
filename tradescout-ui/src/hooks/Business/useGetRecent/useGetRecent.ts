import { useQuery } from "@tanstack/react-query";
import { businessApiClient } from "../../../api/BusinessApiClient";
import { useAuth } from "../../useAuth/useAuth";

export const useGetRecent = () => {
  const { selectedBusiness } = useAuth();
  return useQuery({
    queryKey: ["useGetRecent"],
    queryFn: () => businessApiClient.recentTransaction(selectedBusiness),
    enabled: !!selectedBusiness,
  });
};
