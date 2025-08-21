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
  const query = useQuery({
    queryKey: [QueryKeys.getCategory],
    queryFn: ServiceCategory.get,
  });

  return {
    ...query,
    income: query.data?.filter((item) => item.type === "Income") || [],
    expense: query.data?.filter((item) => item.type === "Expense") || [],
  };
};

export const useQueryWallet = () => {
  return useQuery({
    queryKey: [QueryKeys.getWallet],
    queryFn: ServiceWallet.get,
  });
};
