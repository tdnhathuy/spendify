"use client";

import { dialogs } from "@/lib/components/dialogs";
import { Page } from "@/lib/components/shared/page";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { ListWallet } from "@/modules/wallet/components/list-wallet";

export const PageWallet = () => {
  return (
    <Page
      title={"Wallets"}
      headerProps={{ rightComponent: <HeaderButtons /> }}
      className="grid grid-cols-1 xxs:grid-cols-2 lg:grid-cols-3 gap-2 w-full"
    >
      <ListWallet
        onClick={async (wallet) => {
          dialogs.open("wallet", { idWallet: wallet.id });
        }}
      />
    </Page>
  );
};

const HeaderButtons = () => {
  return (
    <div className="flex gap-2">
      <WiseButton size="sm" onClick={() => dialogs.open("transfer")}>
        Transfer
      </WiseButton>

      <WiseButton size="sm" onClick={() => dialogs.open("create-wallet")}>
        Create
      </WiseButton>
    </div>
  );
};

PageWallet.displayName = "PageWallet";
