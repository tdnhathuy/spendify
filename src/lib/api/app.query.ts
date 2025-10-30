import { QueryKeys } from "@/lib/configs";
import { ServiceTrans, ServiceWallet } from "@/lib/services";
import { ServiceConfigSync } from "@/lib/services/config-sync.service";
import { ParamsPagination } from "@/lib/types";
import { getWallets } from "@/server-action";
import { getCategories } from "@/server-action/category.action";
import { getIcons } from "@/server-action/icon.action";
import { useQuery } from "@tanstack/react-query";

export const useQueryTrans = (params: ParamsPagination) => {
  return useQuery({
    queryKey: [QueryKeys.getTrans, params],
    queryFn: () => ServiceTrans.get(params),
  });
};

export const useQueryCategory = () => {
  const query = useQuery({
    queryKey: [QueryKeys.getCategory],
    queryFn: getCategories,
  });

  const data = query.data || [];

  return {
    ...query,
    income: data.filter((item) => item.type === "Income"),
    expense: data.filter((item) => item.type === "Spend"),
  };
};

export const useQueryWallet = () => {
  return useQuery({
    queryKey: [QueryKeys.getWallet],
    queryFn: getWallets,
  });
};

export const keyQueryWalletDetail = (idWallet: string) => {
  return [QueryKeys.getWalletDetail, idWallet];
};

export const useQueryWalletDetail = (idWallet: string) => {
  return useQuery({
    queryKey: keyQueryWalletDetail(idWallet),
    queryFn: () => ServiceWallet.getDetail(idWallet),
    enabled: !!idWallet,
  });
};

export const useQueryConfigSync = () => {
  return useQuery({
    queryKey: [QueryKeys.getConfigSync],
    queryFn: ServiceConfigSync.get,
  });
};

export const useQueryIcon = (disabled = false) => {
  return useQuery({
    queryKey: [QueryKeys.getIcon],
    queryFn: getIcons,
    enabled: !disabled,
  });
};
