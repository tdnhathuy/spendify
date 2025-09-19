"use client";
import { sheets } from "@/lib/components/sheets/sheet.store";
import { ITransaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  TagAssignCategory,
  TagAssignWallet,
  ListTransItemAmount,
  ListTransItemDesc,
  ListTransItemIcon,
  ListTransItemTitle,
  PopoverListTrans,
  TagSplit,
} from "./components";
import { createContext } from "react";

interface TransactionItemProps {
  item: ITransaction;
  transaction: ITransaction;
}

export const ContextTransactionItem = createContext<TransactionItemProps>({
  item: {} as ITransaction,
  transaction: {} as ITransaction,
});

export const TransactionItem = ({ item }: TransactionItemProps) => {
  const onClickTransaction = () => sheets.open("transaction-detail", item);

  const isInvalidate = !item.category || !item.wallet;

  return (
    <ContextTransactionItem.Provider value={{ item, transaction: item }}>
      <div
        className={cn(
          "flex gap-2 w-full  px-4  py-3 rounded-sm",
          "hover:no-underline flex  bg-[#f5f5ff] rounded border-l-4 ",
          "transition-all duration-300",
          !isInvalidate && "hover:border-blue-500 border-blue-300",
          isInvalidate && ""
        )}
        onClick={onClickTransaction}
      >
        <ListTransItemIcon />

        <span className="flex  w-full flex-col gap-2">
          <span className="flex flex-1 justify-between text-xs gap-3">
            <span className="flex gap-2 items-center">
              <ListTransItemTitle />
              <TagAssignCategory />
              <TagAssignWallet />
              <TagSplit />
            </span>
            <PopoverListTrans />
          </span>

          <span className="flex justify-between  gap-4">
            <ListTransItemDesc />
            <ListTransItemAmount />
          </span>
        </span>
      </div>
    </ContextTransactionItem.Provider>
  );
};
