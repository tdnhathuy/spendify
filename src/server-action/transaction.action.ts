"use server";

import { DTOTrans } from "@/lib/dto";
import { ParamsPagination } from "@/lib/types";
import { getAuthenticatedUser } from "@/server/helpers";
import { prisma, selectTrans } from "@/server/prisma";
import { createHash } from "crypto";

export interface PayloadGetTransactions extends ParamsPagination {}

export const getTransactions = async () => {
  const { idUser } = await getAuthenticatedUser();
  const response = await prisma.transaction.findMany({
    where: { idUser },
    orderBy: { date: "desc" },
    select: selectTrans,
  });

  const transactions = response.map(DTOTrans.fromDB);

  console.log("transactions", transactions);
  return transactions;
};

export interface PayloadCreateTransaction {
  amount: string;
}
export async function createTransaction(payload: PayloadCreateTransaction) {
  const { idUser } = await getAuthenticatedUser();
  const { amount } = payload;
  const result = await prisma.transaction.create({
    data: {
      amount: Number(amount),
      idUser,
      date: new Date(),
      note: "",
      idCategory: null,
      idWallet: null,
    },
  });

  return result.id;
}

export interface PayloadAssignCategory {
  idTransaction: string;
  idCategory: string;
}
export async function assignCategory(params: PayloadAssignCategory) {
  const { idTransaction, idCategory } = params;
  const result = await prisma.transaction.update({
    where: { id: idTransaction },
    data: { idCategory },
  });

  return result.id;
}

export const toggleNeedSplit = async (idTransaction: string) => {};

export interface PayloadDeleteTransaction {
  idTransaction: string;
}
export async function deleteTransaction(params: PayloadDeleteTransaction) {
  const { idUser } = await getAuthenticatedUser();
  const { idTransaction: id } = params;

  const result = await prisma.transaction.delete({
    where: { id, idUser },
  });

  return result.id;
}

export interface PayloadCreateSyncTransaction {
  email: string;
  amount: number;
  date: Date;
  note: string;

  walletId: string | null;
  categoryId: string | null;
}

export const createSyncTransaction = async (
  params: PayloadCreateSyncTransaction
) => {
  const { amount, email, note, walletId, categoryId, date } = params;
  const hashNote = createHash("sha256").update(note).digest("hex");

  const { id: idUser } = await prisma.user.findFirstOrThrow({
    where: { email },
    select: { id: true },
  });

  await prisma.transaction.create({
    data: {
      amount,
      note,
      date,
      idWallet: walletId,
      idCategory: categoryId,
      idUser,
    },
  });
};
