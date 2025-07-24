"use client";

import { QueryKeys } from "@/lib/configs";
import { ServiceWallet } from "@/lib/services";
import { ButtonAddWallet } from "@/modules/wallet/components/add-wallet.button";
import { DialogWallet } from "@/modules/wallet/components/wallet-dialog/dialog";
import { WalletItem } from "@/modules/wallet/components/wallet-item";
import { useQuery } from "@tanstack/react-query";

export const PageWallet = () => {
  const { data } = useQuery({
    queryKey: [QueryKeys.getWallet],
    queryFn: ServiceWallet.get,
  });

  const listWallet = data?.data || [];

  return (
    <div className="flex w-full flex-col gap-2">
      <h1>Wallet</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2  w-full">
        <ButtonAddWallet />

        {listWallet.map((wallet) => {
          return <WalletItem key={wallet.id} wallet={wallet} />;
        })}

        <DialogWallet />
      </div>
    </div>
  );
};
