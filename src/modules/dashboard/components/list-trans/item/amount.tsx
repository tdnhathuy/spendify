"use client";

import { formatMoney } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ContextTransItem } from "@/modules/dashboard/components/list-trans/item/list-trans-item";
import { use } from "react";

export const ListTransItemAmount = () => {
  const { item: transaction } = use(ContextTransItem);
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
