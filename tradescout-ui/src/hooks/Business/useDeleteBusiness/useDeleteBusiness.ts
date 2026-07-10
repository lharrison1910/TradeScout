import { useMutation } from "@tanstack/react-query";
import { businessApiClient } from "../../../api/BusinessApiClient";

export const useDeleteBusiness = () =>
  useMutation({
    mutationKey: ["useDeleteBusiness"],
    mutationFn: (businessId: string) =>
      businessApiClient.deleteBusiness(businessId),
  });
