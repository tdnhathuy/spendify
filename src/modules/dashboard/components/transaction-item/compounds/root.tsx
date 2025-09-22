"use client";

import { sheets } from "@/lib/components/sheets/sheet.store";
import { ITransaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { createContext, memo, useMemo, useCallback, ReactNode } from "react";

export const ContextTransactionItem = createContext<{
  transaction: ITransaction;
}>({
  transaction: {} as ITransaction,
});

interface RootProps {
  children: ReactNode;
  transaction: ITransaction;
}

export const Root = memo(({ children, transaction }: RootProps) => {
  const onClickTransaction = useCallback(
    () => sheets.open("transaction-detail", transaction),
    [transaction]
  );

  const isInvalidate = useMemo(
    () => !transaction.category || !transaction.wallet,
    [transaction.category, transaction.wallet]
  );

  const contextValue = useMemo(() => ({ transaction }), [transaction]);

  return (
    <ContextTransactionItem.Provider value={contextValue}>
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
        {children}
      </div>
    </ContextTransactionItem.Provider>
  );
});

Root.displayName = "TransactionItemRoot";
