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
      ...(walletIds.length > 0 && {
        OR: [
          { idWallet: { in: walletIds } },
          {
            splits: {
              some: {
                OR: [
                  { idWalletFrom: { in: walletIds } },
                  { idWalletTo: { in: walletIds } },
                ],
              },
            },
          },
          {
            transfer: {
              OR: [
                { idWalletFrom: { in: walletIds } },
                { idWalletTo: { in: walletIds } },
              ],
            },
          },
        ],
      }),
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

  // Validate transaction và lấy thông tin
  const transaction = await prisma.transaction.findUniqueOrThrow({
    where: { id: idTransaction, idUser },
    select: {
      idWallet: true,
      transfer: { select: { id: true } },
    },
  });

  // Validation: Transaction không được có transfer
  if (transaction.transfer) {
    throw new Error("Cannot create split for transaction with transfer");
  }

  // Create TransactionSplit directly instead of nested create
  const result = await prisma.transactionSplit.create({
    data: {
      amount,
      idUser,
      idWalletFrom: transaction.idWallet,
      idWalletTo,
      idTransaction,
    },
  });

  return true;
}

export interface PayloadMarkTransfer {
  idTransaction: string;
  idWalletTo: string;
  amount: number;
  fee?: number;
}

/**
 * Đánh dấu một transaction là transfer giữa 2 ví
 * - Tạo TransactionTransfer record
 * - Cập nhật balance của 2 ví (trừ From, cộng To)
 * - Validation: Transaction không được có splits hoặc transfer trước đó
 * - Amount và fee được đảm bảo là số dương
 */
export const markTransfer = async (params: PayloadMarkTransfer) => {
  const { idUser } = await getAuthenticatedUser();
  const {
    idTransaction,
    idWalletTo,
    amount: rawAmount,
    fee: rawFee = 0,
  } = params;

  // 0. Normalize amount và fee về số dương
  const amount = Math.abs(rawAmount);
  const fee = Math.abs(rawFee);

  // 0.1. Validation: Amount phải > 0
  if (amount === 0) {
    throw new Error("Transfer amount must be greater than 0");
  }

  // 1. Validate transaction tồn tại và lấy idWallet nguồn
  const transaction = await prisma.transaction.findUniqueOrThrow({
    where: { id: idTransaction, idUser },
    select: {
      idWallet: true,
      splits: { select: { id: true } },
      transfer: { select: { id: true } },
    },
  });

  // 2. Validation: Transaction phải có wallet
  if (!transaction.idWallet) {
    throw new Error("Transaction must have a wallet to create transfer");
  }

  // 3. Validation: Transaction không được có splits
  if (transaction.splits.length > 0) {
    throw new Error("Cannot create transfer for transaction with splits");
  }

  // 4. Validation: Transaction không được có transfer trước đó
  if (transaction.transfer) {
    throw new Error("Transaction already has a transfer");
  }

  // 5. Validation: Không thể transfer sang cùng 1 ví
  if (transaction.idWallet === idWalletTo) {
    throw new Error("Cannot transfer to the same wallet");
  }

  // 6. Tạo TransactionTransfer và cập nhật balance trong 1 transaction
  const idWalletFrom = transaction.idWallet; // TypeScript now knows it's not null
  const result = await prisma.$transaction(async (tx) => {
    // Tạo TransactionTransfer với amount và fee là số dương
    const transfer = await tx.transactionTransfer.create({
      data: {
        amount,
        fee,
        idUser,
        idTransaction,
        idWalletFrom,
        idWalletTo,
      },
    });

    // Cập nhật balance: Trừ ví nguồn (amount + fee)
    await tx.wallet.update({
      where: { id: idWalletFrom },
      data: {
        balance: {
          decrement: amount + fee,
        },
      },
    });

    // Cập nhật balance: Cộng ví đích (amount)
    await tx.wallet.update({
      where: { id: idWalletTo },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return transfer;
  });

  return result;
};

export interface PayloadRemoveTransfer {
  idTransaction: string;
}

/**
 * Xóa transfer và hoàn lại balance cho 2 ví
 */
export const removeTransfer = async (params: PayloadRemoveTransfer) => {
  const { idUser } = await getAuthenticatedUser();
  const { idTransaction } = params;

  // 1. Lấy thông tin transfer
  const transfer = await prisma.transactionTransfer.findFirstOrThrow({
    where: {
      idTransaction,
      idUser,
    },
  });

  // 2. Xóa transfer và hoàn lại balance trong 1 transaction
  await prisma.$transaction(async (tx) => {
    // Xóa TransactionTransfer
    await tx.transactionTransfer.delete({
      where: { id: transfer.id },
    });

    // Hoàn lại balance: Cộng ví nguồn (amount + fee)
    await tx.wallet.update({
      where: { id: transfer.idWalletFrom },
      data: {
        balance: {
          increment: transfer.amount + transfer.fee,
        },
      },
    });

    // Hoàn lại balance: Trừ ví đích (amount)
    await tx.wallet.update({
      where: { id: transfer.idWalletTo },
      data: {
        balance: {
          decrement: transfer.amount,
        },
      },
    });
  });

  return true;
};
