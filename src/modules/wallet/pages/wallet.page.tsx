"use client";

import { useQueryWallet } from "@/lib/api/app.query";
import { ButtonAddWallet } from "@/modules/wallet/components/add-wallet.button";
import { DialogWallet } from "@/modules/wallet/components/wallet-dialog/dialog";
import { WalletItem } from "@/modules/wallet/components/wallet-item";

export const PageWallet = () => {
  const { data: listWallet = [] } = useQueryWallet();

  return (
    <div className="flex w-full flex-col gap-2">
      <h1>Wallet</h1>

      <div className="grid grid-cols-1 xxs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
        <ButtonAddWallet />

        {listWallet.map((wallet) => {
          return <WalletItem key={wallet.id} wallet={wallet} />;
        })}

        <DialogWallet />
      </div>
    </div>
  );
};

PageWallet.displayName = "PageWallet";
