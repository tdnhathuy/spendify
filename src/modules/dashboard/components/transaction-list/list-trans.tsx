"use client";

import { QueryKeys } from "@/lib/configs";
import { TransactionListItem } from "@/modules/dashboard/components/transaction-item/list-trans-item";
import { getTransactions } from "@/server-action";
import { useQuery } from "@tanstack/react-query";
import { Root as TransactionItemRoot } from "../transaction-item/compounds/root";

export const ListTrans = () => {
  const { data } = useQuery({
    initialData: [],
    queryKey: [QueryKeys.infiniteTrans],
    queryFn: getTransactions,
  });

  console.log("data", data);

  return (
    <div className="flex gap-2 flex-col ">
      <ul className="flex flex-col gap-4 mx-auto  w-full overflow-y-hidden">
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
};
