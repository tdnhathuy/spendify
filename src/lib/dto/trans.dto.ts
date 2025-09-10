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
  // const transfer = DTOTransfer.fromDB(transaction.transfer);
  console.log("transaction.transfer", transaction.idTransfer);

  const transfer: ITransaction["transfer"] = transaction.idTransfer
    ? {
        id: transaction.idTransfer,
        amount: transaction.amount.toNumber(),
        fromWallet: DTOTransfer.fromDB(transaction.transferFrom!)!,
        toWallet: DTOTransfer.fromDB(transaction.transferTo!)!,
      }
    : null;

  console.log("transfer", transfer);

  const result: ITransaction = {
    id: transaction.id,
    amount: transaction.amount.toNumber(),
    isAdjust: transaction.isAdjust ?? false,
    date: transaction.date,
    description: transaction.note,

    category: category,
    categoryParent: categoryParent,
    wallet: wallet,
    infoSync: infoSync,
    transfer: transfer,
    // transfer: transfer,
    // transfer: !!transaction.idTransfer
    //   ? {
    //       id: transaction.idTransfer,
    //       amount: transaction.amount.toNumber(),
    //       fromWallet: transaction.transferFrom?.fromWallet,
    //       toWallet: transaction.transferTo?.toWallet,
    //     }
    //   : null,
  };

  return result;
};

export const DTOTrans = {
  fromDB,
};
