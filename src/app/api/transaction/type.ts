import { Prisma } from "@/generated/prisma";

export const prismaSelectIcon: Prisma.IconSelect = {
  id: true,
  code: true,
};

export type TypeSelectIcon = Prisma.IconGetPayload<{
  select: typeof prismaSelectIcon;
}>;

export const transactionInclude: Prisma.TransactionInclude = {
  category: {
    select: {
      icon: true,
    },
    omit: {
      idUser: true,
      idIcon: true,
      idParent: true,
    },
  },
  wallet: {
    select: {
      id: true,
      name: true,
      icon: { select: prismaSelectIcon },
    },
  },
} as const;

export type TransactionWithCategoryWallet = Prisma.TransactionGetPayload<{
  include: typeof transactionInclude;
}>;
