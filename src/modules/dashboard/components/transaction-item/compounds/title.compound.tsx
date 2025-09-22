import { ContextTransactionItem } from "./root";
import { use } from "react";

export const ListTransItemTitle = () => {
  const { transaction } = use(ContextTransactionItem);

  const category = transaction.categoryParent?.name || "";

  const isTransfer = !!transaction.transfer;

  const title = isTransfer ? "Transfer" : category;

  if (!title) return null;

  return <h1 className="font-semibold text-sm">{title}</h1>;
};
