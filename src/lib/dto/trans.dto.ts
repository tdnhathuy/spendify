import { DTOCategory } from "@/lib/dto/category.dto";
import { DTOWallet } from "@/lib/dto/wallet.dto";
import { ITransaction } from "@/lib/types";
import { DBTransaction } from "@/server";

const fromDB = (transaction: DBTransaction): ITransaction => {
  const result: ITransaction = {
    amount: transaction.amount,
    // categoryParent: DTOCategory.fromDB(transaction.category),
    date: transaction.date,
    note: transaction.note || "",
    id: transaction.id,

    category: DTOCategory.fromDB(transaction.category),
    wallet: DTOWallet.fromDB(transaction.wallet),
    isInitTransaction: transaction.isInitTransaction,
    splits: transaction.splits.map((x) => ({
      id: x.id,
      amount: x.amount,
      fromWallet: x.fromWallet ? DTOWallet.fromDBSimple(x.fromWallet) : null,
      toWallet: x.toWallet ? DTOWallet.fromDBSimple(x.toWallet) : null,
    })),
  };

  return result;
};

export const DTOTrans = {
  fromDB,
};
