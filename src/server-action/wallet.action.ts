"use server";

import { WalletType } from "@/generated/prisma";
import { TypeSchemaWalletDetail } from "@/lib/components/sheets/wallet-detail/schema";
import { DTOWallet } from "@/lib/dto";
import { isNotNull } from "@/lib/helpers";
import { IWallet } from "@/lib/types";
import {
  getAuthenticatedUser,
  prisma,
  selectTrans,
  selectTransToCalc,
  selectWallet,
} from "@/server";

export const getBalanceWallet = async (idWallet: string) => {
  const { idUser } = await getAuthenticatedUser();
  const trans = await prisma.transaction.findMany({
    where: { idWallet, idUser },
    select: selectTransToCalc,
  });

  const splits = await prisma.transactionSplit.findMany({
    where: { idWalletTo: idWallet },
    select: { amount: true },
  });

  const balance =
    trans.reduce((acc, curr) => acc + curr.amount, 0) +
    splits.reduce((acc, curr) => acc + curr.amount, 0);

  return balance || 0;
};

export const getInitBalanceWallet = async (idWallet: string) => {
  const { idUser } = await getAuthenticatedUser();
  const trans = await prisma.transaction.findFirst({
    where: { idWallet: idWallet, idUser, isInitTransaction: true },
    select: { amount: true },
  });

  return trans?.amount || 0;
};

export async function getWallets() {
  const { idUser } = await getAuthenticatedUser();

  const wallets = await prisma.wallet.findMany({
    where: { idUser },
    orderBy: { createdAt: "desc" },
    select: selectWallet,
  });

  const result = wallets.map(DTOWallet.fromDB).filter(isNotNull);

  return await Promise.all(
    result.map(async (w) => {
      const currentBalance = await getBalanceWallet(w.id);
      const initBalance = await getInitBalanceWallet(w.id);
      return { ...w, currentBalance, initBalance };
    })
  );
}

export interface ParamsAdjustBalance {
  idWallet: string;
  newAmount: number;
}
export async function adjustBalance(params: ParamsAdjustBalance) {
  const { idWallet, newAmount } = params;
  const { idUser } = await getAuthenticatedUser();

  const wallet = await prisma.wallet.findUniqueOrThrow({
    where: { id: idWallet, idUser },
    select: selectWallet,
  });

  const { currentBalance } = DTOWallet.fromDB(wallet)!;

  const amount = newAmount - currentBalance;

  const trans = await prisma.transaction.create({
    data: {
      amount,
      wallet: { connect: { id: idWallet } },
      user: { connect: { id: idUser } },
    },
    select: selectTrans,
  });

  return trans.id;
}

export interface PayloadCreateWallet {
  name: string;
  type: WalletType;
  includeInTotal: boolean;
  idIcon: string | null;
  initBalance: number;
}
export async function createWallet(params: PayloadCreateWallet) {
  const { name, type, includeInTotal, idIcon, initBalance } = params;
  const { idUser } = await getAuthenticatedUser();

  const wallet = await prisma.wallet.create({
    data: { name, type, includeInTotal, idIcon, idUser, balance: 0 },
  });

  await prisma.transaction.create({
    data: {
      amount: initBalance,
      date: new Date(),
      note: "Initial balance",
      isInitTransaction: true,
      idWallet: wallet.id,
      idUser,
    },
  });

  return wallet;
}

export interface PayloadUpdateWallet {
  wallet: TypeSchemaWalletDetail;
}
export const updateWallet = async (params: PayloadUpdateWallet) => {
  const { wallet } = params;
  const { idUser } = await getAuthenticatedUser();

  await prisma.wallet.update({
    where: { id: wallet.id, idUser },
    data: {
      idIcon: wallet.icon?.id || null,
      name: wallet.name,
    },
    select: selectWallet,
  });

  return wallet;
};
