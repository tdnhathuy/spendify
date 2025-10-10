"use client";
import {
  useMutateDeleteTrans,
  useMutateToggleNeedSplit,
  useMutateUnmarkTransfer,
} from "@/lib/api/app.mutate";
import { dialogs } from "@/lib/components";
import { useTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item.hook";
import { useState } from "react";

type Actions = "transfer" | "split" | "mark-split" | "delete";

export const usePopoverListTrans = () => {
  const [open, setOpen] = useState(false);

  const { transaction } = useTransactionItem();

  const { mutateAsync: deleteTrans } = useMutateDeleteTrans(transaction.id);
  const { mutateAsync: unmarkTransfer } = useMutateUnmarkTransfer();
  const { mutateAsync: toggleNeedSplit } = useMutateToggleNeedSplit();

  const onDelete = async () => {
    await deleteTrans({ idTransaction: transaction.id });
  };

  const onSplit = () => {
    dialogs.open("split-transaction", { idTransaction: transaction.id });
  };

  const onTransfer = () => {
    dialogs.open("transfer", {
      isMarkTransfer: true,
      amount: transaction.amount + "",
      idTransaction: transaction.id,
      walletFrom: {
        id: transaction.wallet?.id || "",
        name: transaction.wallet?.name || "",
        currentBalance: "0",
        icon: transaction.wallet?.icon || null,
      },
    });
  };

  const onUnmarkTransfer = async () => {
    await unmarkTransfer(transaction.id);
  };

  const onClick = (type: Actions) => () => {
    setOpen(false);

    const id = transaction.id;
    if (type === "mark-split") return toggleNeedSplit(id);

    if (type === "delete") return onDelete();
    if (type === "transfer") return onTransfer();
    if (type === "split") return onSplit();
    if (type === "unmark-transfer") return onUnmarkTransfer();
  };

  return {
    onClick,
    open,
    setOpen,

    status: {
      isCanMarkTransfer: !!transaction.infoSync,
      isCanDelete: !transaction.infoSync,
      isCanUnmarkTransfer: !!transaction.transfer && !!transaction.infoSync,
      isCanSplit: true,
    },
  };
};
