import { QueryKeys, queryClient } from "@/lib/configs";
import type { Wallet } from "@/lib/types";

const { getWallet } = QueryKeys;

export const Cache = {
  getWallet: (): Wallet[] => {
    return queryClient.getQueryData<Wallet[]>([getWallet]) || [];
  },
};
