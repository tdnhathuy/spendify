"use server";

import { DTOTrans } from "@/lib/dto";
import { getAuthenticatedUser } from "@/server/helpers";
import { prisma, selectTrans } from "@/server/prisma";
import { createHash } from "crypto";

export interface PayloadGetTransactions {
  walletIds: string[];
}
export async function getTransactions(params: PayloadGetTransactions) {
  const { idUser } = await getAuthenticatedUser();

  const { walletIds = [] } = params;

  const response = await prisma.transaction.findMany({
    where: {
      idUser,
      ...(walletIds.length > 0 && { idWallet: { in: walletIds } }),
    },
    orderBy: { date: "desc" },
    select: selectTrans,
  });

  const transactions = response.map(DTOTrans.fromDB);

  return transactions;
}

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
  const { idUser } = await getAuthenticatedUser();
  const { idTransaction, idCategory } = params;

  const [{ type }, { amount }] = await Promise.all([
    prisma.category.findFirstOrThrow({
      where: { id: idCategory, idUser },
      select: { type: true },
    }),
    prisma.transaction.findUniqueOrThrow({
      where: { id: idTransaction, idUser },
      select: { amount: true },
    }),
  ]);

  const newAmount = type === "Income" ? Math.abs(amount) : -Math.abs(amount);

  return prisma.transaction.update({
    where: { id: idTransaction, idUser },
    data: { idCategory, amount: newAmount },
    select: selectTrans,
  });
}

export interface PayloadAssignWallet {
  idTransaction: string;
  idWallet: string;
}
export async function assignWallet(params: PayloadAssignWallet) {
  const { idTransaction, idWallet } = params;
  const result = await prisma.transaction.update({
    where: { id: idTransaction },
    data: { idWallet },
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

export interface PayloadSplitTransaction {
  idTransaction: string;
  idWallet: string;
  amount: number;
}
export async function splitTransaction(params: PayloadSplitTransaction) {
  const { idUser } = await getAuthenticatedUser();
  const { idTransaction, idWallet: idWalletTo, amount } = params;

  const { idWallet: idWalletFrom } = await prisma.transaction.findUniqueOrThrow(
    {
      where: { id: idTransaction, idUser },
      select: { idWallet: true },
    }
  );

  const result = await prisma.transaction.update({
    where: { id: idTransaction, idUser },
    data: {
      splits: { create: { amount, idWalletFrom, idWalletTo } },
    },
  });

  console.log("result", result);

  return true;
}
