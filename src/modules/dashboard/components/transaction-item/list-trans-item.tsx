// Re-export the compound component from compounds folder

import { useTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item.hook";
import * as TransactionItem from "./compounds";

interface TransactionListItemProps {}
export const TransactionListItem = (props: TransactionListItemProps) => {
  const { isTransfer } = useTransactionItem();

  return (
    <TransactionItem.Wrapper>
      <TransactionItem.Icon />
      <div className="flex flex-1 items-start flex-col gap-2">
        {isTransfer ? (
          <TransactionItem.TileTransfer />
        ) : (
          <span className="flex  items-center gap-2">
            <TransactionItem.Title />
            <TransactionItem.TagCategory />
            <TransactionItem.TagWallet />
            <TransactionItem.TagSplit />
          </span>
        )}

        <TransactionItem.Desc />
        <TransactionItem.Date />
      </div>

      <div className="flex flex-col items-end">
        <TransactionItem.Amount />
        <TransactionItem.PopoverListTrans />
      </div>
    </TransactionItem.Wrapper>
  );
};
