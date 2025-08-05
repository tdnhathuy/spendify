import { Transaction } from "@/generated/prisma";
import { ITransaction } from "@/lib/types";

const fromObjects = (transactions: Transaction[]): ITransaction[] => {
  return transactions.map((trans) => {
    return fromObject(trans);
  });
};
const fromObject = (transaction: Transaction): ITransaction => {
  return {
    id: transaction.id,
    amount: transaction.amount,
    date: transaction.date,
    description: transaction.note,
    category: null,
    categoryParent: null,
    wallet: null,
  };
};

export const DTOTrans = {
  fromObjects,
  fromObject,
};
