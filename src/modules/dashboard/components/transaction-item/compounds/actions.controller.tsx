import {
  useMutateDeleteTrans,
  useMutateUnmarkTransfer,
} from "@/lib/api/app.mutate";
import { dialogs } from "@/lib/components";
import { ContextTransactionItem } from "@/modules/dashboard/components/transaction-item/compounds/root";
import { use } from "react";

export const usePopoverListTrans = () => {
  const { transaction } = use(ContextTransactionItem);

  const { mutateAsync: deleteTrans } = useMutateDeleteTrans(transaction.id);
  const { mutateAsync: unmarkTransfer } = useMutateUnmarkTransfer();

  const onDelete = async () => {
    await deleteTrans(transaction.id);
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

  return {
    actions: {
      onDelete,
      onTransfer,
      onUnmarkTransfer,
      onSplit,
    },

    status: {
      isCanMarkTransfer: !!transaction.infoSync,
      isCanDelete: !transaction.infoSync,
      isCanUnmarkTransfer: !!transaction.transfer && !!transaction.infoSync,
      isCanSplit: true,
    },
  };
};
