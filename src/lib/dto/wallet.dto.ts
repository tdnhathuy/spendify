import { DTOIcon } from "@/lib/dto/icon.dto";
import { DBWallet, DBWalletDetail, DBWalletSimple } from "@/lib/server";
import { IWallet, IWalletDetail, IWalletSimple } from "@/lib/types";

const calculateCurrentBalance = (wallet: DBWallet): number => {
  const initBalance = wallet.initBalance.toNumber();
  
  // Tính tổng tất cả transactions (bao gồm cả transfer, adjust, và regular transactions)
  const allTransactionsAmount = wallet.transactions.reduce(
    (acc, curr) => acc + curr.amount.toNumber(),
    0
  );

  // Với kiến trúc mới, tất cả các giao dịch đều được lưu trong bảng transactions:
  // - Regular transactions: thu/chi thông thường
  // - Transfer transactions: chuyển tiền (âm cho ví nguồn, dương cho ví đích)
  // - Adjustment transactions: điều chỉnh số dư
  // - Sync transactions: giao dịch từ email sync
  
  const currentBalance = initBalance + allTransactionsAmount;
  
  return currentBalance;
};

const getWalletBreakdown = (wallet: DBWallet) => {
  const regularTransactions = wallet.transactions.filter(t => !t.transfer && !t.adjust && !t.infoSync);
  const transferTransactions = wallet.transactions.filter(t => t.transfer);
  const adjustmentTransactions = wallet.transactions.filter(t => t.adjust);
  const syncTransactions = wallet.transactions.filter(t => t.infoSync);
  
  return {
    regular: {
      count: regularTransactions.length,
      amount: regularTransactions.reduce((acc, curr) => acc + curr.amount.toNumber(), 0)
    },
    transfer: {
      count: transferTransactions.length,
      amount: transferTransactions.reduce((acc, curr) => acc + curr.amount.toNumber(), 0)
    },
    adjustment: {
      count: adjustmentTransactions.length,
      amount: adjustmentTransactions.reduce((acc, curr) => acc + curr.amount.toNumber(), 0)
    },
    sync: {
      count: syncTransactions.length,
      amount: syncTransactions.reduce((acc, curr) => acc + curr.amount.toNumber(), 0)
    }
  };
};

const fromDB = (wallet: DBWallet | null): IWallet | null => {
  if (!wallet) return null;

  const currentBalance = calculateCurrentBalance(wallet);

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

  const currentBalance = calculateCurrentBalance(wallet);

  return {
    id: wallet.id,
    name: wallet.name,
    type: wallet.type,
    icon: DTOIcon.fromDB(wallet.icon),
    initBalance: wallet.initBalance.toNumber(),
    currentBalance: currentBalance,
    includeInReport: wallet.includeInReport,
    // Detail specific fields
    cardNumber: wallet.cardNumber,
    cardStatementPassword: wallet.cardStatementPassword,
    cardStatementDate: wallet.cardStatementDate,
    totalTransaction: wallet.transactions.length,
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

const fromDBWithBreakdown = (wallet: DBWallet | null) => {
  if (!wallet) return null;
  
  const baseWallet = fromDB(wallet);
  const breakdown = getWalletBreakdown(wallet);
  
  return {
    ...baseWallet,
    breakdown
  };
};

export const DTOWallet = {
  fromDB,
  fromDBDetail,
  fromDBSimple,
  fromDBWithBreakdown,
  calculateCurrentBalance,
  getWalletBreakdown,
};
