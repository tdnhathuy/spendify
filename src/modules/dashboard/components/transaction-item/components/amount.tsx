"use client";

import { formatMoney } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ContextTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item";
import { use } from "react";

export const ListTransItemAmount = () => {
  const { item: transaction } = use(ContextTransactionItem);
  return (
    <span
      onClick={(e) => e.stopPropagation()}
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
