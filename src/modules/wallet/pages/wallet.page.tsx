"use client";

import { dialogs } from "@/lib/components/dialogs";
import { ButtonAddWallet } from "@/modules/wallet/components/add-wallet.button";
import { ListWallet } from "@/modules/wallet/components/list-wallet";
import { DialogWallet } from "@/modules/wallet/components/wallet-dialog/dialog";

export const PageWallet = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <h1>Wallet</h1>

      <div className="grid grid-cols-1 xxs:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
        <ButtonAddWallet />

        <ListWallet onClick={(wallet) => dialogs.open("wallet", wallet)} />

        <DialogWallet />
      </div>
    </div>
  );
};

PageWallet.displayName = "PageWallet";
