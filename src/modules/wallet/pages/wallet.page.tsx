"use client";

import { dialogs } from "@/lib/components/dialogs";
import { PageHeader } from "@/lib/components/shared/page-header";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { ButtonAddWallet } from "@/modules/wallet/components/add-wallet.button";
import { ListWallet } from "@/modules/wallet/components/list-wallet";

export const PageWallet = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <PageHeader
        title="Wallets"
        rightComponent={
          <WiseButton size="sm" onClick={() => dialogs.open("transfer")}>
            Transfer
          </WiseButton>
        }
      />

      <div className="grid grid-cols-1 xxs:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
        <ButtonAddWallet />

        <ListWallet
          onClick={async (wallet) => {
            dialogs.open("wallet", { idWallet: wallet.id });
          }}
        />
      </div>
    </div>
  );
};

PageWallet.displayName = "PageWallet";
