"use server";

import { withParams } from "@/server/helpers";

// Define the type for params that getWallet expects
type GetWalletParams = {
  walletId?: string;
  includeTransactions?: boolean;
};

export const getWallet = withParams<GetWalletParams, string>(
  async ({ idUser }, params) => {
    console.log("idUser", idUser);
    console.log("params", params);

    // Now you can use params with type safety
    if (params.walletId) {
      console.log("Getting wallet with ID:", params.walletId);
    }

    if (params.includeTransactions) {
      console.log("Including transactions in response");
    }

    return "1232";
  }
);
