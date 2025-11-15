"use client";

import { dialogs } from "@/lib/components/dialogs";
import { useTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item.hook";
import { WiseTag } from "../../../../../lib/components/wise/wise-tag";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { sheets } from "@/lib/components/sheets/sheet.store";

export const TagWallet = ({ disabled = false }: { disabled?: boolean }) => {
  const { transaction, walletName, walletIcon } = useTransactionItem();

  const handleClick = () => {
    // dialogs.open("assign-wallet", transaction);
    sheets.open("assign-wallet", {
      ...transaction,
      onSelectWallet: () => {
        console.log("onSelectWallet");
      },
    });
  };

  return (
    <WiseTag
      icon={
        walletIcon ? <IconPicker icon={walletIcon} size="xs" disabled /> : null
      }
      title={walletName}
      variant={"wallet"}
      onClick={handleClick}
      disabled={disabled}
    />
  );
};
