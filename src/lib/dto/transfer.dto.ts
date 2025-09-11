import { DTOWallet } from "./wallet.dto";
import { ITransfer } from "../types";
import { DBTransfer } from "@/lib/server";

export const DTOTransfer = {
  fromDB: (transfer?: DBTransfer | null): ITransfer | null => {
    if (!transfer) return null;

    const fromWallet = DTOWallet.fromDBSimple(transfer.fromWallet);
    const toWallet = DTOWallet.fromDBSimple(transfer.toWallet);

    return {
      id: transfer.id,
      amount: transfer.amount.toNumber(),
      fromWallet: fromWallet!,
      toWallet: toWallet!,
    };
  },
};
