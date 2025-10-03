import { Prisma } from "@/generated/prisma";
import { prisma } from "@/server/prisma/prisma.server";

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

export const selectCategoryBase = {
  id: true,
  name: true,
  type: true,
  icon: { select: selectIcon },
} satisfies Prisma.CategorySelect;

export const selectWalletSimple = {
  id: true,
  name: true,
  icon: { select: selectIcon },
} satisfies Prisma.WalletSelect;

// TransactionTransfer đã bị xóa, thay thế bằng thông tin transfer trong Transaction

export const selectWallet = {
  id: true,
  name: true,
  type: true,
  initBalance: true,
  transactions: {
    select: {
      id: true,
      amount: true,
      category: { select: { type: true } },
      adjust: { select: { id: true, reason: true, amount: true } },
      infoSync: { select: { id: true, emailProvider: true } },
      walletTransferTo: { select: selectWalletSimple }, // Wallet đích cho transfer

      // Split information
      splits: {
        select: {
          id: true,
          amount: true,
          note: true,
          wallet: { select: selectWalletSimple },
        },
      },
    },
  },
  // Split transactions received by this wallet
  splitsReceived: {
    select: {
      id: true,
      amount: true,
      note: true,
      createdAt: true,
      transaction: {
        select: {
          id: true,
          date: true,
          wallet: { select: selectWalletSimple }, // Wallet gốc
        },
      },
    },
  },
  includeInReport: true,
  icon: { select: selectIcon },
  
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

export const selectTrans = {
  id: true,
  amount: true,
  note: true,
  date: true,
  adjust: true,

  category: { select: selectCategory },
  wallet: { select: selectWalletSimple },
  infoSync: { select: selectInfoSync },

  walletTransferTo: { select: selectWalletSimple }, // Wallet đích cho transfer

  isNeedSplit: true,
  splits: {
    select: {
      id: true,
      amount: true,
      note: true,
      wallet: { select: selectWalletSimple },
    },
  },
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

export type DBCategoryBase = Prisma.CategoryGetPayload<{
  select: typeof selectCategoryBase;
}>;
export type DBWallet = Prisma.WalletGetPayload<{ select: typeof selectWallet }>;

// DBTransfer type đã bị xóa vì không còn TransactionTransfer model

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

export const getProfile = (idUser: string) =>
  prisma.user.findFirstOrThrow({
    where: { id: idUser },
    include: profileInclude,
  });
