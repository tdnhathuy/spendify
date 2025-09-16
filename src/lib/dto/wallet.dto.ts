import { DTOIcon } from "@/lib/dto/icon.dto";
import { WalletBalanceService } from "@/lib/services/wallet-balance.service";
import { DBWallet, DBWalletDetail, DBWalletSimple } from "@/lib/server";
import { IWallet, IWalletDetail, IWalletSimple } from "@/lib/types";

const calculateCurrentBalance = (wallet: DBWallet): number => {
  const initBalance = wallet.initBalance.toNumber();
  let balance = initBalance;

  // Tính toán từ transactions thuộc về wallet này
  for (const transaction of wallet.transactions) {
    const amount = transaction.amount.toNumber();

    // Kiểm tra nếu đây là transaction transfer OUT
    if (transaction.walletTransferTo) {
      // Đây là transfer OUT (từ wallet này sang wallet khác) - trừ tiền
      balance -= amount;
    } else if (transaction.category) {
      // Đây là transaction thông thường (income/expense)
      if (transaction.category.type === "Income") {
        balance += amount;
      } else if (transaction.category.type === "Expense") {
        balance -= amount;
      }
      // Category type 'Other' không ảnh hưởng đến balance
    }
  }

  // TODO: Transfer IN sẽ được tính ở nơi khác vì không có trong wallet.transactions

  return balance;
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

  // TODO: fromDBDetail cũng cần async để tính balance đúng
  // Tạm thời dùng logic cũ, sẽ được override ở API level
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

export const DTOWallet = {
  fromDB,
  fromDBDetail,
  fromDBSimple,
  calculateCurrentBalance,
};
