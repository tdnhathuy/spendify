import { DTOCategory } from "@/lib/dto/category.dto";
import { DTOInfoSync } from "@/lib/dto/info-sync.dto";
import { DTOTransfer } from "@/lib/dto/transfer.dto";
import { DTOWallet } from "@/lib/dto/wallet.dto";
import { DBTransaction } from "@/lib/server";
import { ITransaction } from "@/lib/types";

const fromDB = (transaction: DBTransaction): ITransaction => {
  const category = DTOCategory.fromDB(transaction.category);
  const categoryParent = transaction.category?.parent
    ? DTOCategory.fromDB(transaction.category?.parent as any)
    : category;

  const infoSync = DTOInfoSync.fromDB(transaction.infoSync as any);
  const wallet = DTOWallet.fromDB(transaction.wallet);
  const transfer = DTOTransfer.fromDB(transaction.transfer as any);

  const result: ITransaction = {
    id: transaction.id,
    amount: transaction.amount.toNumber(),
    date: transaction.date,
    description: transaction.note,

    category: category,
    categoryParent: categoryParent,
    wallet: wallet,
    infoSync: infoSync,
    transfer: transfer,
  };

  return result;
};

export const DTOTrans = {
  fromDB,
};
