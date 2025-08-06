import { DTOCategory } from "@/lib/dto/category.dto";
import { DTOWallet } from "@/lib/dto/wallet.dto";
import { RawTransaction } from "@/lib/server";
import { ITransaction } from "@/lib/types";

const fromObject = (transaction: RawTransaction): ITransaction => {
  const { wallet } = transaction;

  const category = DTOCategory.fromRawCategory(transaction.category);
  const categoryParent = transaction.category?.parent
    ? DTOCategory.fromRawCategory(transaction.category?.parent as any)
    : category;

  const result: ITransaction = {
    id: transaction.id,
    amount: transaction.amount,
    date: transaction.date,
    description: transaction.note,
    category: category,
    categoryParent: categoryParent,
    wallet: DTOWallet.fromRawWallet(wallet),
  };

  return result;
};

export const DTOTrans = {
  fromObject,
};
