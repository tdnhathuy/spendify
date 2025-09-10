import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/server/prisma.server";

export const selectIconUser = {
  id: true,
  url: true,
  idFlatIcon: true,
} satisfies Prisma.IconUserSelect;

export const selectIconGlobal = {
  id: true,
  url: true,
  idFlatIcon: true,
} satisfies Prisma.IconGlobalSelect;

export const selectIcon = {
  id: true,
  iconGlobal: { select: selectIconGlobal },
  iconUser: { select: selectIconUser },
} satisfies Prisma.IconSelect;

export const selectCategory = {
  id: true,
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
  icon: { select: selectIcon },
} satisfies Prisma.CategorySelect;

export const selectWalletSimple = {
  id: true,
  name: true,
  icon: { select: selectIcon },
} satisfies Prisma.WalletSelect;

export const selectWallet = {
  id: true,
  name: true,
  type: true,
  initBalance: true,
  transactions: {
    select: { id: true, amount: true, category: { select: { type: true } } },
  },
  includeInReport: true,
  icon: { select: selectIcon },
  transferFromWallet: { select: { amount: true } },
  transferToWallet: { select: { amount: true } },
} satisfies Prisma.WalletSelect;

export const selectWalletDetail = {
  ...selectWallet,
  cardNumber: true,
  cardStatementDate: true,
  cardStatementPassword: true,
} satisfies Prisma.WalletSelect;

export const selectConfigSync = {
  id: true,
  idUser: true,
  fromEmail: true,
  walletId: true,
  toWallet: { select: selectWallet },
} satisfies Prisma.SyncConfigSelect;

export const selectInfoSync = {
  id: true,
  emailProvider: true,
  emailReceived: true,
  emailTitle: true,
} satisfies Prisma.TransactionInfoSyncSelect;

export const selectTransfer = {
  id: true,
  amount: true,
  fromWallet: { select: selectWalletSimple },
  toWallet: { select: selectWalletSimple },
} satisfies Prisma.TransferSelect;

export const selectTrans = {
  id: true,
  amount: true,
  note: true,
  date: true,
  category: { select: selectCategory },
  wallet: { select: selectWallet },
  infoSync: { select: selectInfoSync },
  idTransfer: true,
  isToTransfer: true,
  isFromTransfer: true,
  transferTo: { select: selectTransfer },
  transferFrom: { select: selectTransfer },
  isAdjust: true,
} satisfies Prisma.TransactionSelect;

export const profileInclude = {
  categories: { select: selectCategory },
  transactions: { select: selectTrans },
  wallets: { select: selectWallet },
} satisfies Prisma.UserInclude;

export type DBUser = Prisma.UserGetPayload<{ include: typeof profileInclude }>;
export type DBCategory = Prisma.CategoryGetPayload<{
  select: typeof selectCategory;
}>;
export type DBWallet = Prisma.WalletGetPayload<{ select: typeof selectWallet }>;

export type DBWalletSimple = Prisma.WalletGetPayload<{
  select: typeof selectWalletSimple;
}>;

export type DBSyncConfig = Prisma.SyncConfigGetPayload<{
  select: typeof selectConfigSync;
}>;

export type DBWalletDetail = Prisma.WalletGetPayload<{
  select: typeof selectWalletDetail;
}>;

export type DBUserIcon = Prisma.IconGetPayload<{
  select: typeof selectIconUser;
}>;

export type DBIcon = Prisma.IconGetPayload<{
  select: typeof selectIcon;
}>;

export type DBSystemIcon = Prisma.IconGlobalGetPayload<{
  select: typeof selectIconGlobal;
}>;

export type DBTransaction = Prisma.TransactionGetPayload<{
  select: typeof selectTrans;
}>;
export type DBTransfer = Prisma.TransferGetPayload<{
  select: typeof selectTransfer;
}>;

export const getProfile = (idUser: string) =>
  prisma.user.findFirstOrThrow({
    where: { id: idUser },
    include: profileInclude,
  });
