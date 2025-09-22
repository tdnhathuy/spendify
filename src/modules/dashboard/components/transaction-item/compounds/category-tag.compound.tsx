"use client";

import { dialogs } from "@/lib/components/dialogs";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { TransactionItemTag } from "./base-tag.compound";
import { ContextTransactionItem } from "./root";
import { useContext } from "react";
import { PiWarningBold } from "react-icons/pi";

export const TagAssignCategory = () => {
  const { transaction } = useContext(ContextTransactionItem);

  const {
    name: title = "Uncategorized",
    icon: iconCategory,
    //
  } = transaction.category || {};

  const handleClick = () => {
    dialogs.open("assign-category", transaction);
  };

  const icon = iconCategory ? (
    <IconPicker icon={iconCategory} size="xs" disabled />
  ) : (
    <PiWarningBold />
  );

  return (
    <TransactionItemTag
      icon={icon}
      title={title}
      variant={"category"}
      onClick={handleClick}
    />
  );
};
