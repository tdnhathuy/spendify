import { ContextTransItem } from "@/modules/dashboard/components/list-trans/item/list-trans-item";
import { use } from "react";

export const ListTransItemTitle = () => {
  const { item: transaction } = use(ContextTransItem);

  const category = transaction.categoryParent?.name || "Uncategorized";

  const isTransfer = !!transaction.transfer;

  const title = isTransfer ? "Transfer" : category;

  return <h1 className=" font-semibold text-sm">{title}</h1>;
};
