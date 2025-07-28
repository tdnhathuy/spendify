import { QueryKeys } from "@/lib/configs";
import { ServiceCategory, ServiceTrans, ServiceWallet } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";

export const useQueryTrans = () => {
  return useQuery({
    queryKey: [QueryKeys.getTrans],
    queryFn: ServiceTrans.get,
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
