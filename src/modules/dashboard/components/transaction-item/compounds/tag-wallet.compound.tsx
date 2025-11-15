"use client";

import { useMutateToasty } from "@/hooks/use-query-toast";
import { useMutateAssignWallet } from "@/lib/api/app.mutate";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { sheets } from "@/lib/components/sheets/sheet.store";
import { IWallet, IWalletSimple } from "@/lib/types";
import { useTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item.hook";
import { WiseTag } from "../../../../../lib/components/wise/wise-tag";

export const TagWallet = ({
  disabled = false,
  wallet,
}: {
  disabled?: boolean;
  wallet?: IWalletSimple | null | undefined;
}) => {
  const { transaction } = useTransactionItem();

  const { asyncToast: assignWallet } = useMutateToasty(useMutateAssignWallet);

  const walletName = wallet?.name || transaction.wallet?.name || "";
  const walletIcon = wallet?.icon || transaction.wallet?.icon || null;

  const handleClick = () => {
    // dialogs.open("assign-wallet", transaction);
    sheets.open("assign-wallet", {
      ...transaction,
      onSelectWallet: (wallet: IWallet) => {
        console.log("wallet", wallet);
        assignWallet({ idTransaction: transaction.id, idWallet: wallet.id });
      },
    });
  };

  return (
    <WiseTag
      icon={
        walletIcon ? <IconPicker icon={walletIcon} size="xs" disabled /> : null
      }
      title={walletName || ""}
      variant={"wallet"}
      onClick={handleClick}
      disabled={disabled}
    />
  );
};
