"use server";

import { getAuthenticatedUser } from "@/server/helpers";
import { prisma } from "@/server/prisma";
import { createHash, hash } from "crypto";
import { uuidv4 } from "zod";

export interface PayloadCreateTransaction {
  amount: string;
}
export async function createTransaction(payload: PayloadCreateTransaction) {
  const { idUser } = await getAuthenticatedUser();
  const { amount } = payload;
  const result = await prisma.transaction.create({
    data: {
      amount,
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

export const toggleNeedSplit = async (idTransaction: string) => {
  return prisma.$transaction(async (tx) => {
    const { isNeedSplit } = await tx.transaction.findUniqueOrThrow({
      where: { id: idTransaction },
      select: { isNeedSplit: true },
    });

    return tx.transaction.update({
      where: { id: idTransaction },
      data: { isNeedSplit: !isNeedSplit },
      select: { isNeedSplit: true },
    });
  });
};

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
      infoSync: {
        create: {
          emailProvider: "sms",
          emailReceived: email,
          emailTitle: note,
          idUser,
          providerMsgId: hashNote,
        },
      },
    },
  });
};
