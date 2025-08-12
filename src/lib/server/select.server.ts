import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/server/prisma.server";

export const selectIcon = {
  id: true,
  code: true,
} satisfies Prisma.IconSelect;

export const selectCategory = {
  id: true,
  icon: { select: selectIcon },
  name: true,
  type: true,
  parent: {
    select: {
      id: true,
      name: true,
      type: true,
      icon: { select: selectIcon },
    },
  },
} satisfies Prisma.CategorySelect;

export const selectWallet = {
  id: true,
  icon: { select: selectIcon },
  name: true,
  type: true,
  initBalance: true,
  transactions: {
    select: { id: true, amount: true, category: { select: { type: true } } },
  },
  includeInReport: true,
} satisfies Prisma.WalletSelect;

export const selectTrans = {
  id: true,
  amount: true,
  category: { select: selectCategory },
  wallet: { select: selectWallet },
  note: true,
  date: true,
} satisfies Prisma.TransactionSelect;

export const profileInclude = {
  icons: { select: selectIcon },
  categories: { select: selectCategory },
  transactions: { select: selectTrans },
  wallets: { select: selectWallet },
} satisfies Prisma.UserInclude;

export type DBUser = Prisma.UserGetPayload<{ include: typeof profileInclude }>;
export type DBCategory = Prisma.CategoryGetPayload<{
  select: typeof selectCategory;
}>;
export type DBWallet = Prisma.WalletGetPayload<{ select: typeof selectWallet }>;
export type DBIcon = Prisma.IconGetPayload<{ select: typeof selectIcon }>;
export type DBTransaction = Prisma.TransactionGetPayload<{
  select: typeof selectTrans;
}>;

export const getProfile = (idUser: string) =>
  prisma.user.findFirstOrThrow({
    where: { id: idUser },
    include: profileInclude,
  });
