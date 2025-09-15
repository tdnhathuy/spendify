import { prisma } from "@/lib/server/prisma.server";

export const getCurrentByWalletId = async (idWallet: string) => {
  const wallet = await prisma.wallet.findFirstOrThrow({
    where: { id: idWallet },
    select: {
      initBalance: true,
      transactions: {
        where: { transfer: null },
        select: {
          amount: true,
          category: { select: { type: true } },
        },
      },
      transactionTransferFrom: true,
      transactionTransferTo: true,
    },
  });

  // Helper function to sum amounts
  const sumAmounts = (items: { amount: { toNumber: () => number } }[]) =>
    items.reduce((acc, curr) => acc + curr.amount.toNumber(), 0);

  // Calculate transfers
  const transferIn = 0;
  const transferOut = 0;

  // Calculate transactions by type
  const transactions = wallet.transactions || [];
  const income = sumAmounts(
    transactions.filter((tx) => tx.category?.type === "Income")
  );
  const expense = sumAmounts(
    transactions.filter(
      (tx) => tx.category?.type === "Expense" || !tx.category?.type
    )
  );

  // Calculate final balance
  const balance =
    Number(wallet.initBalance.toNumber()) +
    income -
    expense +
    transferIn -
    transferOut;

  return balance;
};

export const getAllAmountTransferByWalletId = async (idWallet: string) => {
  return 0;
};
