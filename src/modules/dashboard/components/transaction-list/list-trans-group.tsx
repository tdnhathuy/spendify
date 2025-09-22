import { ITransaction } from "@/lib/types";
import { TransactionListItem } from "@/modules/dashboard/components/transaction-item/list-trans-item";
import { HeaderListTrans } from "@/modules/dashboard/components/transaction-list/list-trans-header";
import { memo } from "react";

import { Root as TransactionItemRoot } from "../transaction-item/compounds/root";

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
        {data.map((transaction) => {
          return (
            <TransactionItemRoot key={transaction.id} transaction={transaction}>
              <TransactionListItem />
            </TransactionItemRoot>
          );
        })}
      </ul>
    </div>
  );
});

ListTransGroup.displayName = "ListTransGroup";
