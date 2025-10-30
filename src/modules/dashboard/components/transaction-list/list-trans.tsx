"use client";

import { useQueryTransaction } from "@/lib/api/app.query";
import { TransactionListItem } from "@/modules/dashboard/components/transaction-item/list-trans-item";
import { useStoreDashboard } from "@/modules/dashboard/pages/dashboard.store";
import { Root as TransactionItemRoot } from "../transaction-item/compounds/root";

export const ListTrans = () => {
  const { filter } = useStoreDashboard();
  const { data = [] } = useQueryTransaction(filter);

  return (
    <>
      <div className="flex gap-2 flex-col ">
        <ul className="flex flex-col gap-4 mx-auto  w-full overflow-y-hidden">
          {data.map((transaction) => {
            return (
              <TransactionItemRoot
                key={transaction.id}
                transaction={transaction}
              >
                <TransactionListItem />
              </TransactionItemRoot>
            );
          })}
        </ul>
      </div>
    </>
  );
};
