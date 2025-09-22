"use client";

import { dialogs } from "@/lib/components/dialogs";
import { useTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item.hook";
import { TransactionItemTag } from "../base-tag.compound";
import { IconPicker } from "@/lib/components/shared/icon-picker";

export const TagWallet = () => {
  const { transaction, walletName, walletIcon } = useTransactionItem();

  const handleClick = () => {
    dialogs.open("assign-wallet", transaction);
  };

  return (
    <TransactionItemTag
      icon={
        walletIcon ? <IconPicker icon={walletIcon} size="xs" disabled /> : null
      }
      title={walletName}
      variant={"wallet"}
      onClick={handleClick}
    />
  );
};
