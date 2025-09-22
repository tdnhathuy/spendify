"use client";

import { formatMoney } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { useTransactionItem } from "../list-trans-item.hook";

export const Amount = () => {
  const { amount, isIncome, isExpense, isTransfer } = useTransactionItem();

  return (
    <span
      onClick={(e) => e.stopPropagation()}
      className={cn("text-base text-gray-500 font-semibold", {
        "text-green-500": isIncome,
        "text-red-500": isExpense,
        "text-blue-500": isTransfer,
      })}
    >
      {formatMoney(amount)}
    </span>
  );
};
