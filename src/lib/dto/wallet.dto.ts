import { DTOIcon } from "@/lib/dto/icon.dto";
import { IWallet } from "@/lib/types";
import { DBWallet } from "@/server";

// const calculateCurrentBalance = (wallet: DBWallet): number => {
//   const initBalance = wallet.initBalance.toNumber();
//   let balance = initBalance;

//   // Tính toán từ transactions thuộc về wallet này
//   for (const transaction of wallet.transactions) {
//     const amount = transaction.amount.toNumber();

//     // Kiểm tra nếu đây là transaction transfer OUT
//     if (transaction.walletTransferTo) {
//       // Đây là transfer OUT (từ wallet này sang wallet khác) - trừ tiền
//       balance -= amount;
//     }

//     if (transaction.category) {
//       // Đây là transaction thông thường (income/expense)
//       if (transaction.category.type === "Income") {
//         balance += amount;
//       } else if (transaction.category.type === "Expense") {
//         balance -= amount;
//       }
//       // Category type 'Other' không ảnh hưởng đến balance
//     }

//     if (!!transaction.adjust) {
//       balance += transaction.adjust.amount.toNumber();
//     }
//   }

//   for (const splitsReceived of wallet.splitsReceived) {
//     const amount = splitsReceived.amount.toNumber();
//     balance += amount;
//   }

//   // TODO: Transfer IN sẽ được tính ở nơi khác vì không có trong wallet.transactions

//   return balance;
// };

const fromDB = (wallet: DBWallet | null): IWallet | null => {
  if (!wallet) return null;

  // const currentBalance = calculateCurrentBalance(wallet);

  return {
    id: wallet.id,
    name: wallet.name,
    type: wallet.type,
    currentBalance: 10,
    icon: wallet.icon && DTOIcon.fromDB(wallet.icon),
    includeInReport: true,
    // initBalance: wallet.initBalance.toNumber(),
    // includeInReport: wallet.includeInReport,
    // currentBalance: currentBalance,
  };
};

export const DTOWallet = {
  fromDB,
};
