import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/server/prisma.server";

export const getWallet = (idUser: string) => {
  return prisma.wallet.findMany({
    where: { idUser },
    ...findWallet,
  });
};

export const getTrans = (idUser: string) => {
  return prisma.transaction.findMany({
    where: { idUser },
    orderBy: { date: "desc" },
    include: {
      category: findCategory,
      user: true,
      wallet: findWallet,
    },
    omit: {
      idCategory: true,
      idWallet: true,
      idUser: true,
      idIcon: true,
    },
  });
};

const findCategory: Prisma.CategoryFindManyArgs = {
  include: {
    icon: { omit: { idUser: true } },
    parent: {
      omit: { idUser: true, idParent: true, idIcon: true },
      include: { icon: { omit: { idUser: true } } },
    },
  },
  omit: { idUser: true, idParent: true, idIcon: true },
};

const findWallet: Prisma.WalletFindManyArgs = {
  include: {
    icon: { omit: { idUser: true } },
    transactions: {
      select: {
        amount: true,
        category: {
          select: {
            type: true,
          },
        },
      },
    },
  },
  omit: { idUser: true, idIcon: true },
};

export type RawTransaction = Awaited<ReturnType<typeof getTrans>>[number];
export type RawCategory = RawTransaction["category"];

export type RawWallet = Awaited<ReturnType<typeof getWallet>>[number];

