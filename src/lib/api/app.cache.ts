import { QueryKeys, queryClient } from "@/lib/configs";
import type { IWallet } from "@/lib/types";

const { getWallet } = QueryKeys;

export const Cache = {
  getWallet: (): IWallet[] => {
    return queryClient.getQueryData<IWallet[]>([getWallet]) || [];
  },
};
