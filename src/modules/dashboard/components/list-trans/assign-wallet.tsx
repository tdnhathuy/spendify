"use client";

import { dialogs } from "@/lib/components/dialogs";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { ContextTransItem } from "@/modules/dashboard/components/list-trans/item/list-trans-item";
import { ListTransItemTag } from "@/modules/dashboard/components/list-trans/item/tag";
import { useContext } from "react";

export const AssignWallet = () => {
  const { item: transaction } = useContext(ContextTransItem);

  const {
    name: title = "Unwallet",
    icon: iconWallet,
    //
  } = transaction.wallet || {};

  const handleClick = () => {
    dialogs.open("assign-wallet", transaction);
  };

  return (
    <ListTransItemTag
      icon={<IconPicker icon={iconWallet} size="xs" disabled />}
      title={title}
      variant={"wallet"}
      onClick={handleClick}
    />
  );
};
