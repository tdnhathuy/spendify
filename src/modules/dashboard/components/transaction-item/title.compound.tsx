import { useTransactionItem } from "./use-transaction-item";

export const ListTransItemTitle = () => {
  const { isTransfer, categoryName } = useTransactionItem();

  const title = isTransfer ? "Transfer" : categoryName;

  if (!title) return null;

  return <h1 className="font-semibold text-sm">{title}</h1>;
};
