"use client";

import { dialogs } from "@/lib/components/dialogs";
import { TransactionItemTag } from "../base-tag.compound";
import { useTransactionItem } from "../list-trans-item.hook";

export const TagCategory = () => {
  const { transaction, categoryName, categoryIcon } = useTransactionItem();

  const handleClick = () => {
    dialogs.open("assign-category", transaction);
  };

  return (
    <TransactionItemTag
      icon={categoryIcon}
      title={categoryName}
      variant={"category"}
      onClick={handleClick}
    />
  );
};
