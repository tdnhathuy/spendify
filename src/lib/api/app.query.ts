import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/configs";
import { ServiceCategory, ServiceTrans, ServiceWallet } from "@/lib/services";
import { ParamsPagination } from "@/lib/types";

export const useQueryTrans = (params: ParamsPagination) => {
  return useQuery({
    queryKey: [QueryKeys.getTrans, params],
    queryFn: () => ServiceTrans.get(params),
  });
};

export const useQueryInfiniteTrans = (params: ParamsPagination) => {
  return useInfiniteQuery({
    queryKey: [QueryKeys.getTrans, params],
    queryFn: ({ pageParam = 0 }) =>
      ServiceTrans.get({ ...params, skip: pageParam }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length > 0 ? pages.length : undefined,
    initialPageParam: 0,
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
