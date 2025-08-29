import { queryClient, QueryKeys } from "@/lib/configs";

const { getWallet, getCategory, getTrans, infiniteTrans, getConfigSync } =
  QueryKeys;
export const Refetch = {
  wallet: () => queryClient.invalidateQueries({ queryKey: [getWallet] }),
  category: () => queryClient.invalidateQueries({ queryKey: [getCategory] }),
  trans: () => queryClient.invalidateQueries({ queryKey: [infiniteTrans] }),
  configSync: () =>
    queryClient.invalidateQueries({ queryKey: [getConfigSync] }),
};
