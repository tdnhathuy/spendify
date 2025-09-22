"use client";

import { dialogs } from "@/lib/components/dialogs";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { TransactionItemTag } from "./base-tag.compound";
import { useTransactionItem } from "./use-transaction-item";
import { PiWarningBold } from "react-icons/pi";

export const TagAssignCategory = () => {
  const { transaction, categoryName, categoryIcon, hasCategory } = useTransactionItem();

  const handleClick = () => {
    dialogs.open("assign-category", transaction);
  };

  const icon = hasCategory && categoryIcon ? (
    <IconPicker icon={categoryIcon} size="xs" disabled />
  ) : (
    <PiWarningBold />
  );

  return (
    <TransactionItemTag
      icon={icon}
      title={categoryName}
      variant={"category"}
      onClick={handleClick}
    />
  );
};
