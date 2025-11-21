"use server";

import { WalletType } from "@/generated/prisma";
import { TypeSchemaWalletDetail } from "@/lib/components/sheets/wallet-detail/schema";
import { DTOWallet } from "@/lib/dto";
import { isNotNull } from "@/lib/helpers";
import {
  getAuthenticatedUser,
  prisma,
  selectTrans,
  selectTransToCalc,
  selectWallet,
} from "@/server";

export const getBalanceWallet = async (idWallet: string) => {
  const { idUser } = await getAuthenticatedUser();

  const [initBalance, trans, splits, transfersTo, transfersFrom] =
    await Promise.all([
      getInitBalanceWallet(idWallet),
      prisma.transaction.findMany({
        where: { idWallet, idUser, isInitTransaction: false, transfer: null },
        select: selectTransToCalc,
      }),
      prisma.transactionSplit.findMany({
        where: { idWalletTo: idWallet, idUser },
        select: { amount: true },
      }),
      prisma.transactionTransfer.findMany({
        where: { idWalletTo: idWallet, idUser },
        select: { amount: true },
      }),
      prisma.transactionTransfer.findMany({
        where: { idWalletFrom: idWallet, idUser },
        select: { amount: true },
      }),
    ]);

  const balance =
    initBalance +
    trans.reduce((acc, curr) => acc + curr.amount, 0) +
    splits.reduce((acc, curr) => acc + curr.amount, 0) +
    transfersTo.reduce((acc, curr) => acc + curr.amount, 0) -
    transfersFrom.reduce((acc, curr) => acc + curr.amount, 0);

  console.log("balance", balance);
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

  if (result.length === 0) return [];

  const walletIds = result.map((w) => w.id);

  // Lấy TẤT CẢ dữ liệu cần thiết trong 1 lần với batch queries
  const [initTransactions, transactions, splits, transfersTo, transfersFrom] =
    await Promise.all([
      // Init balances cho tất cả wallets
      prisma.transaction.findMany({
        where: {
          idWallet: { in: walletIds },
          idUser,
          isInitTransaction: true,
        },
        select: { idWallet: true, amount: true },
      }),
      // Transactions thường cho tất cả wallets
      prisma.transaction.findMany({
        where: {
          idWallet: { in: walletIds },
          idUser,
          isInitTransaction: false,
          transfer: null,
        },
        select: { idWallet: true, amount: true },
      }),
      // Splits cho tất cả wallets
      prisma.transactionSplit.findMany({
        where: { idWalletTo: { in: walletIds }, idUser },
        select: { idWalletTo: true, amount: true },
      }),
      // Transfers TO cho tất cả wallets
      prisma.transactionTransfer.findMany({
        where: { idWalletTo: { in: walletIds }, idUser },
        select: { idWalletTo: true, amount: true },
      }),
      // Transfers FROM cho tất cả wallets
      prisma.transactionTransfer.findMany({
        where: { idWalletFrom: { in: walletIds }, idUser },
        select: { idWalletFrom: true, amount: true },
      }),
    ]);

  // Group dữ liệu theo walletId để tính toán
  const initBalanceMap = new Map<string, number>();
  initTransactions.forEach((t) => {
    if (!t.idWallet) return;
    initBalanceMap.set(t.idWallet, t.amount);
  });

  const transactionsMap = new Map<string, number>();
  transactions.forEach((t) => {
    if (!t.idWallet) return;
    const current = transactionsMap.get(t.idWallet) || 0;
    transactionsMap.set(t.idWallet, current + t.amount);
  });

  const splitsMap = new Map<string, number>();
  splits.forEach((s) => {
    if (!s.idWalletTo) return;
    const current = splitsMap.get(s.idWalletTo) || 0;
    splitsMap.set(s.idWalletTo, current + s.amount);
  });

  const transfersToMap = new Map<string, number>();
  transfersTo.forEach((t) => {
    if (!t.idWalletTo) return;
    const current = transfersToMap.get(t.idWalletTo) || 0;
    transfersToMap.set(t.idWalletTo, current + t.amount);
  });

  const transfersFromMap = new Map<string, number>();
  transfersFrom.forEach((t) => {
    if (!t.idWalletFrom) return;
    const current = transfersFromMap.get(t.idWalletFrom) || 0;
    transfersFromMap.set(t.idWalletFrom, current + t.amount);
  });

  // Tính toán balance cho từng wallet
  return result.map((w) => {
    const initBalance = initBalanceMap.get(w.id) || 0;
    const transAmount = transactionsMap.get(w.id) || 0;
    const splitsAmount = splitsMap.get(w.id) || 0;
    const transfersToAmount = transfersToMap.get(w.id) || 0;
    const transfersFromAmount = transfersFromMap.get(w.id) || 0;

    const currentBalance =
      initBalance +
      transAmount +
      splitsAmount +
      transfersToAmount -
      transfersFromAmount;

    return { ...w, currentBalance, initBalance };
  });
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
