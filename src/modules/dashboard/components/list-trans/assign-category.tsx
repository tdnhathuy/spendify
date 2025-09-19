"use client";

import { dialogs } from "@/lib/components/dialogs";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { ContextTransItem } from "@/modules/dashboard/components/list-trans/item/list-trans-item";
import { ListTransItemTag } from "@/modules/dashboard/components/list-trans/item/tag";
import { useContext } from "react";

export const AssignCategory = () => {
  const { item: transaction } = useContext(ContextTransItem);

  const {
    name: title = "No category",
    icon: iconCategory,
    //
  } = transaction.category || {};

  const handleClick = () => {
    dialogs.open("assign-category", transaction);
  };

  const icon = <IconPicker icon={iconCategory} size="xs" disabled />;

  return (
    <ListTransItemTag
      icon={icon}
      title={title}
      variant={"category"}
      onClick={handleClick}
    />
  );
};
