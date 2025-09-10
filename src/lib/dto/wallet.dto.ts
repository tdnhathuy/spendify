import { DTOIcon } from "@/lib/dto/icon.dto";
import { DBWallet, DBWalletDetail, DBWalletSimple } from "@/lib/server";
import { IWallet, IWalletDetail, IWalletSimple } from "@/lib/types";

const fromDB = (wallet: DBWallet | null): IWallet | null => {
  if (!wallet) return null;

  const allAmount = wallet.transactions.reduce(
    (acc, curr) => acc + curr.amount.toNumber(),
    0
  );

  const allTransferExpense =
    wallet.transferFromWallet.reduce(
      (acc, curr) => acc + curr.amount.toNumber(),
      0
    ) * -1;

  const allTransferIncome = wallet.transferToWallet.reduce(
    (acc, curr) => acc + curr.amount.toNumber(),
    0
  );

  const currentBalance =
    allAmount +
    wallet.initBalance.toNumber() +
    allTransferIncome +
    allTransferExpense;
  return {
    id: wallet.id,
    name: wallet.name,
    type: wallet.type,

    icon: DTOIcon.fromDB(wallet.icon),
    initBalance: wallet.initBalance.toNumber(),
    currentBalance: currentBalance,
    includeInReport: wallet.includeInReport,
  };
};

const fromDBDetail = (wallet: DBWalletDetail): IWalletDetail | null => {
  if (!wallet) return null;

  return {
    // ...fromDB(wallet),
    cardNumber: wallet.cardNumber,
    cardStatementPassword: wallet.cardStatementPassword,
    cardStatementDate: wallet.cardStatementDate,
    totalTransaction: wallet.transactions.length,

    id: wallet.id,
    name: wallet.name,
    initBalance: wallet.initBalance.toNumber(),
    currentBalance: wallet.initBalance.toNumber(),
    icon: DTOIcon.fromDB(wallet.icon),
    type: wallet.type,
    includeInReport: wallet.includeInReport,
  };
};

const fromDBSimple = (wallet: DBWalletSimple): IWalletSimple | null => {
  if (!wallet) return null;
  return {
    id: wallet.id,
    name: wallet.name,
    icon: DTOIcon.fromDB(wallet.icon),
  };
};

export const DTOWallet = {
  fromDB,
  fromDBDetail,
  fromDBSimple,
};
