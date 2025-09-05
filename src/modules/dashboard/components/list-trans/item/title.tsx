import { ITransaction } from "@/lib/types";

export const ListTransItemTitle = ({
  transaction,
}: {
  transaction: ITransaction;
}) => {
  const category = transaction.categoryParent?.name || "Uncategorized";

  const isTransfer = !!transaction.transfer;

  const title = isTransfer ? "Transfer" : category;

  return <h1 className=" font-semibold text-sm">{title}</h1>;
};
