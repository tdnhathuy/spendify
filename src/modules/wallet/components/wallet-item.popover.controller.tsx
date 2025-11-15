"use client";

import { dialogs } from "@/lib/components";
import { IWallet } from "@/lib/types";
import { PopoverWalletItemProps } from "@/modules/wallet/components/wallet-item.popover";
import { useState } from "react";

type Type = "edit" | "transfer" | "adjust";

export const usePopoverWalletItem = (props: PopoverWalletItemProps) => {
  const { wallet } = props;

  const [open, setOpen] = useState(false);

  const onClick = (type: Type) => () => {
    setOpen(false);

    if (type === "transfer") return onClickTransfer(wallet);
    if (type === "adjust") return onClickAdjust(wallet);
    if (type === "edit") return onClickEdit(wallet);
  };

  return { open, setOpen, onClick };
};

const onClickAdjust = (wallet: IWallet) => {
  dialogs.open("adjust-balance", wallet);
};

const onClickTransfer = (wallet: IWallet) => {
  console.log("wallet-----------", wallet);
  const currentBalance = wallet.currentBalance.toString();
  dialogs.open("transfer", {
    amount: currentBalance,
    idTransaction: null,
    idWalletFrom: wallet.id,
    idWalletTo: null,
  });
};

const onClickEdit = (wallet: IWallet) => {
  dialogs.open("wallet", { idWallet: wallet.id });
};
