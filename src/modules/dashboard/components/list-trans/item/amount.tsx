"use client";

import { formatMoney } from "@/lib/helpers";
import { ITransaction } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  transaction: ITransaction;
};

export const ListTransItemAmount = ({ transaction }: Props) => {
  return (
    <span
      className={cn("text-base text-gray-500 font-semibold", {
        "text-green-500": transaction.category?.type === "Income",
        "text-red-500": transaction.category?.type === "Expense",
        "text-blue-500": !!transaction.transfer,
      })}
    >
      {formatMoney(transaction.amount)}
    </span>
  );
};
