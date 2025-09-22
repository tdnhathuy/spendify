"use client";

import { dialogs } from "@/lib/components/dialogs";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { TransactionItemTag } from "./base-tag.compound";
import { ContextTransactionItem } from "./root";
import { useContext } from "react";
import { PiWarningBold } from "react-icons/pi";

export const TagAssignWallet = () => {
  const { transaction } = useContext(ContextTransactionItem);

  const {
    name: title = "Unclassified",
    icon: iconWallet,
    //
  } = transaction.wallet || {};

  const handleClick = () => {
    dialogs.open("assign-wallet", transaction);
  };

  const icon = iconWallet ? (
    <IconPicker icon={iconWallet} size="xs" disabled />
  ) : (
    <PiWarningBold />
  );

  return (
    <TransactionItemTag
      icon={icon}
      title={title}
      variant={"wallet"}
      onClick={handleClick}
    />
  );
};
