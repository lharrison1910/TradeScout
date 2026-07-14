import { useQuery } from "@tanstack/react-query";
import { businessApiClient } from "../../../api/BusinessApiClient";

export const useGetBusiness = () =>
  useQuery({
    queryKey: ["useGetBusiness"],
    queryFn: () => businessApiClient.getBusinesses(),
  });
