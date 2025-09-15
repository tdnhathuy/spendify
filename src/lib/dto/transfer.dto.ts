import { DTOWallet } from "./wallet.dto";
import { ITransfer } from "../types";
import { DBTransfer } from "@/lib/server";

export const DTOTransfer = {
  fromDB: (transfer?: DBTransfer | null): ITransfer | null => {
    if (!transfer) return null;

    // const fromWallet = DTOWallet.fromDBSimple(transfer.walletFrom);
    // const toWallet = DTOWallet.fromDBSimple(transfer.walletTo);

    return {
      id: transfer.id,
      idWallet: transfer.walletFrom?.id || "",
      // idWallet: transfer.walletFrom?.id || "",
      // idWallet: transfer.walletFrom?.id || "",
      // amount: transfer.amount.toNumber(),
      // walletFrom: fromWallet!,
      // walletTo: toWallet!,
    };
  },
};
