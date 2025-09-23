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
  const isTransfer = !!transaction.transfer;
  const isIncome = transaction.category?.type === "Income";
  const isExpense = transaction.category?.type === "Expense";
  const hasCategory = !!transaction.category;
  const hasWallet = !!transaction.wallet;
  const isValid = hasCategory && hasWallet;
  const hasSplits = transaction.splits && transaction.splits.length > 0;

  return {
    // Core data
    transaction,

    // Type checks
    isTransfer,
    isIncome,
    isExpense,
    isNeedSplit: transaction.isNeedSplit ?? false,

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
    description: transaction.description,
    date: transaction.date,
  };
};
