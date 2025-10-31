import { queryClient, QueryKeys } from "@/lib/configs";

const {
  getWallet,
  getCategory,
  infiniteTrans,
  getConfigSync,
  getTrans,
  //
} = QueryKeys;

export const Refetch = {
  wallet: () => queryClient.invalidateQueries({ queryKey: [getWallet] }),
  category: () => queryClient.invalidateQueries({ queryKey: [getCategory] }),
  trans: () => queryClient.invalidateQueries({ queryKey: [getTrans] }),
  configSync: () =>
    queryClient.invalidateQueries({ queryKey: [getConfigSync] }),
  transAndWallet: () => {
    Refetch.wallet();
    Refetch.trans();
  },
};
