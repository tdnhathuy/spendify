import { queryClient, QueryKeys } from "@/lib/configs";
import { ITransaction } from "@/lib/types";

const { getWallet, getCategory, getTrans } = QueryKeys;
export const Refetch = {
  wallet: () => queryClient.refetchQueries({ queryKey: [getWallet] }),
  category: () => queryClient.refetchQueries({ queryKey: [getCategory] }),
  trans: () => queryClient.refetchQueries({ queryKey: [getTrans] }),
};
