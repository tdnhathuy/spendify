"use client";

import { dialogs } from "@/lib/components/dialogs";
import { Page } from "@/lib/components/shared/page";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { IWallet } from "@/lib/types";
import { ListWallet } from "@/modules/wallet/components/list-wallet";

export const PageWallet = () => {
  const onClick = (wallet: IWallet) => {
    dialogs.open("wallet", { idWallet: wallet.id });
  };

  return (
    <Page title={"Wallets"} headerProps={{ rightComponent: <HeaderButtons /> }}>
      <ListWallet onClick={onClick} />
    </Page>
  );
};

const HeaderButtons = () => {
  return (
    <div className="flex gap-2">
      <WiseButton
        size="sm"
        onClick={() =>
          dialogs.open("transfer", {
            amount: "",
            walletFrom: null,
            walletTo: null,
          })
        }
      >
        Transfer
      </WiseButton>

      <WiseButton size="sm" onClick={() => dialogs.open("create-wallet")}>
        Create
      </WiseButton>
    </div>
  );
};

PageWallet.displayName = "PageWallet";
