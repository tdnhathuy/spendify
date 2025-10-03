// Re-export the compound component from compounds folder

import * as TransactionItem from "./compounds";

interface TransactionListItemProps {}
export const TransactionListItem = (props: TransactionListItemProps) => {
  return (
    <TransactionItem.Wrapper>
      <TransactionItem.Icon />

      <div className="flex flex-1 items-start flex-col gap-2">
        <TransactionItem.Title />
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
