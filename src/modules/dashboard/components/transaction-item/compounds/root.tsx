"use client";

import { ITransaction } from "@/lib/types";
import { createContext, memo, ReactNode, useMemo } from "react";

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
  const contextValue = useMemo(() => ({ transaction }), [transaction]);

  return (
    <ContextTransactionItem.Provider value={contextValue}>
      {children}
    </ContextTransactionItem.Provider>
  );
});

Root.displayName = "TransactionItemRoot";
