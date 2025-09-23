"use client";

import { dialogs } from "@/lib/components/dialogs";
import { WiseTag } from "../../../../../lib/components/wise/wise-tag";
import { useTransactionItem } from "../list-trans-item.hook";

export const TagCategory = () => {
  const { transaction, categoryName, categoryIcon } = useTransactionItem();

  const handleClick = () => {
    dialogs.open("assign-category", transaction);
  };

  return (
    <WiseTag
      icon={categoryIcon}
      title={categoryName}
      variant={"category"}
      onClick={handleClick}
    />
  );
};
