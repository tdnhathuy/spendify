"use client";

import { dialogs } from "@/lib/components/dialogs";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import type { ITransaction, IWallet } from "@/lib/types";
import { WrapperAssign } from "@/modules/dashboard/components/list-trans/assign-category";

interface Props {
  transaction: ITransaction;
}

export const AssignWallet = (props: Props) => {
  const { transaction } = props;
  const title = transaction.wallet?.name || "Unwallet";

  return (
    <WrapperAssign
      onClick={() => dialogs.open("assign-wallet", props.transaction)}
    >
      <IconPicker icon={transaction.wallet?.icon} size="xs" disabled />
      <span>{title}</span>
    </WrapperAssign>
  );
};
