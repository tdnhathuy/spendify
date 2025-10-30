"use client";

import {
  SkeletonTransactionListItem,
  TransactionListItem,
} from "@/modules/dashboard/components/transaction-item/list-trans-item";
import { useListTrans } from "@/modules/dashboard/components/transaction-list/list-trans.hook";
import { Root as TransactionItemRoot } from "../transaction-item/compounds/root";

export const ListTrans = () => {
  const { data, isLoading } = useListTrans();

  if (isLoading) return <SkeletonTransactionListItem />;
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex flex-col gap-6 mx-auto w-full overflow-y-hidden">
        {data.map((group) => (
          <div key={group.date} className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm px-2 text-white">
              {group.date}
            </h3>

            <ul className="flex flex-col gap-4">
              {group.transactions.map((transaction) => (
                <TransactionItemRoot
                  key={transaction.id}
                  transaction={transaction}
                >
                  <TransactionListItem />
                </TransactionItemRoot>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
