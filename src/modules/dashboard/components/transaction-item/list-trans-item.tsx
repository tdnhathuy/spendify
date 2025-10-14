// Re-export the compound component from compounds folder

import * as TransactionItem from "./compounds";

interface TransactionListItemProps {}
export const TransactionListItem = (props: TransactionListItemProps) => {
  return (
    <TransactionItem.Wrapper>
      <TransactionItem.Icon />

      <div className="flex flex-1 items-start flex-col gap-2">
        <Wrapper>
          <TransactionItem.Title />
          <TransactionItem.Amount />
        </Wrapper>

        <Wrapper>
          <TransactionItem.Desc />
          <TransactionItem.PopoverListTrans />
        </Wrapper>

        <Wrapper>
          <TransactionItem.Date />
          <TransactionItem.TagSplit />
        </Wrapper>
      </div>
    </TransactionItem.Wrapper>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-between w-full">{children}</div>;
};
