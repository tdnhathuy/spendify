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
      className=""
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
