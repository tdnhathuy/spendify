import { useContext } from "react";
import { ContextTransactionItem } from "./compounds/root";

export const useTransactionItem = () => {
  const context = useContext(ContextTransactionItem);

  if (!context) {
    throw new Error(
      "useTransactionItem must be used within a TransactionItem component"
    );
  }

  const { transaction } = context;

  // Helper computed values
  const isTransfer = false;
  const isIncome = transaction.category?.type === "Income";
  const isExpense = transaction.category?.type === "Spend";
  const hasCategory = !!transaction.category;
  const hasWallet = !!transaction.wallet;
  const isValid = hasCategory && hasWallet;
  const hasSplits = false;

  return {
    // Core data
    transaction,

    // Type checks
    isTransfer,
    isIncome,
    isExpense,
    isNeedSplit: false,
    isAdjust: false,
    isSplit: false,
    isSync: false,

    // Validation
    hasCategory,
    hasWallet,
    isValid,

    // Features
    hasSplits,

    // Computed values
    categoryName: transaction.category?.name || "No tag",
    walletName: transaction.wallet?.name || "No Wallet",
    categoryIcon: transaction.category?.icon ?? null,
    walletIcon: transaction.wallet?.icon ?? null,
    amount: transaction.amount,
    description: transaction.note,
    date: transaction.date,
  };
};
