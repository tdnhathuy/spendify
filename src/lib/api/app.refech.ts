import { queryClient, QueryKeys } from "@/lib/configs";
import { ITransaction } from "@/lib/types";

const { getWallet, getCategory, getTrans } = QueryKeys;
export const Refetch = {
  wallet: () => queryClient.refetchQueries({ queryKey: [getWallet] }),
  category: () => queryClient.refetchQueries({ queryKey: [getCategory] }),
  trans: () => queryClient.refetchQueries({ queryKey: [getTrans] }),
};

export const updateQueryData = {
  trans: (newTrans: ITransaction) => {
    queryClient.setQueryData([QueryKeys.getTrans], (old: ITransaction[]) => {
      return old.map((item) => {
        if (item.id === newTrans.id) {
          return newTrans;
        }
        return item;
      });
    });
  },
};
