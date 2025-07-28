import { DTOCategory } from "@/lib/dto/category.dto";
import { DTOWallet } from "@/lib/dto/wallet.dto";
import { compareId } from "@/lib/helpers/func.helper";
import {
  CategoryClass,
  IconClass,
  TransactionClass,
  WalletClass,
} from "@/lib/model";
import { Transaction } from "@/lib/types";

export const DTOTrans = {
  fromClass: (
    trans: TransactionClass,
    categories: CategoryClass[],
    wallets: WalletClass[],
    icons: IconClass[]
  ): Transaction => {
    const cate = categories.find((x) => compareId(x, trans.idCategory));
    const parent = categories.find((x) => compareId(x, cate?.idParent));
    const wallet = wallets.find((x) => compareId(x, trans.idWallet));

    const category = cate ? DTOCategory.fromClass(cate, icons) : null;
    const categoryParent = parent
      ? DTOCategory.fromClass(parent, icons)
      : category ?? null;

    return {
      id: (trans as any)._id.toString(),
      amount: trans.amount,
      date: trans.date,
      description: trans.description,
      category,
      categoryParent,
      wallet: wallet ? DTOWallet.fromClass(wallet, icons) : null,
    };
  },
};
