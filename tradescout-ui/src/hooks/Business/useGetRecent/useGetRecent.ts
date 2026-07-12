import { useQuery } from "@tanstack/react-query";
import { businessApiClient } from "../../../api/BusinessApiClient";

export const useGetRecent = () =>
  useQuery({
    queryKey: ["useGetRecent"],
    queryFn: () => businessApiClient.recentBusiness(),
  });
