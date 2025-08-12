import { DTOIcon } from "@/lib/dto/icon.dto";
import { DBWallet } from "@/lib/server";
import { IWallet } from "@/lib/types";

const fromDB = (wallet: DBWallet | null): IWallet | null => {
  if (!wallet) return null;

  const allIncome = wallet.transactions.filter(
    (x) => x?.category?.type === "Income"
  );
  const allExpense = wallet.transactions.filter(
    (x) => x?.category?.type === "Expense" || !x?.category?.type
  );

  const currentBalance =
    wallet.initBalance +
    allIncome.reduce((acc, curr) => acc + curr.amount, 0) -
    allExpense.reduce((acc, curr) => acc + curr.amount, 0);

  return {
    id: wallet.id,
    name: wallet.name,
    type: wallet.type,

    icon: DTOIcon.fromDB(wallet.icon),
    initBalance: wallet.initBalance,
    currentBalance: currentBalance,
    includeInReport: wallet.includeInReport,
  };
};

export const DTOWallet = {
  fromDB,
};
