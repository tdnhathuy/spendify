import { ITransaction } from "@/lib/types";
import { TransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item";
import { HeaderListTrans } from "@/modules/dashboard/components/transaction-list/list-trans-header";
import { memo } from "react";

export interface ListTransGroupProps {
  data: ITransaction[];
  date: string;
}

export const ListTransGroup = memo((props: ListTransGroupProps) => {
  const { data = [] } = props;

  return (
    <div className="w-full">
      <HeaderListTrans {...props} />

      <ul className="gap-1 flex flex-col">
        {data.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction}>
            <TransactionItem.Icon />

            <TransactionItem.Content>
              <TransactionItem.Header>
                <TransactionItem.Tags>
                  <TransactionItem.Title />
                  <TransactionItem.CategoryTag />
                  <TransactionItem.WalletTag />
                  <TransactionItem.SplitTag />
                </TransactionItem.Tags>
                <TransactionItem.Actions />
              </TransactionItem.Header>

              <TransactionItem.Footer>
                <TransactionItem.Description />
                <TransactionItem.Amount />
              </TransactionItem.Footer>
            </TransactionItem.Content>
          </TransactionItem>
        ))}
      </ul>
    </div>
  );
});

ListTransGroup.displayName = "ListTransGroup";
