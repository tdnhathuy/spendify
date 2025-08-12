import { QueryKeys } from "@/lib/configs";
import { ServiceCategory, ServiceTrans, ServiceWallet } from "@/lib/services";
import { ParamsPagination } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useQueryTrans = (params: ParamsPagination) => {
  return useQuery({
    queryKey: [QueryKeys.getTrans, params],
    queryFn: () => ServiceTrans.get(params),
  });
};

export const useQueryCategory = () => {
  return useQuery({
    queryKey: [QueryKeys.getCategory],
    queryFn: ServiceCategory.get,
  });
};

export const useQueryWallet = () => {
  return useQuery({
    queryKey: [QueryKeys.getWallet],
    queryFn: ServiceWallet.get,
  });
};
