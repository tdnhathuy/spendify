"use server";

import { getAuthenticatedUser } from "@/server/helpers";
import { prisma, selectTrans } from "@/server/prisma";

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

  return !!result;
}

export interface PayloadAssignCategory {
  idTransaction: string;
  idCategory: string;
}
export async function assignCategory(params: PayloadAssignCategory) {
  const { idTransaction, idCategory } = params;
  return prisma.transaction.update({
    where: { id: idTransaction },
    data: { idCategory },
    select: selectTrans,
  });
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

  return !!result;
}
