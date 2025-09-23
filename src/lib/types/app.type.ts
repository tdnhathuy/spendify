import { CategoryType, WalletType } from "@/generated/prisma";
import { ButtonHTMLAttributes } from "react";

export type FormAction = ButtonHTMLAttributes<HTMLButtonElement>["formAction"];
export interface ParamsPagination {
  page?: number;
  limit?: number;
}

export interface MetaPaging {
  isFirstPage: boolean;
  isLastPage: boolean;
  previousPage: number | null;
  currentPage: number;
  nextPage: number;
  pageCount: number;
  totalCount: number;
}
export interface ResponsePagination<T> {
  data: T;
  message: string;
  status: number;
  meta: MetaPaging;
}

export interface DialogValues {
  open: boolean;
}

export interface DialogActions {
  setOpen: (open: boolean) => void;
}

export interface Response<T> {
  data: T;
  message: string;
  status: number;
}

export type IWallet = {
  id: string;
  name: string;
  initBalance: number;
  currentBalance: number;
  icon: IIcon | null;
  type: WalletType;
  includeInReport: boolean;
};

export type IWalletSimple = {
  id: string;
  name: string;
  icon: IIcon | null;
};

export interface IWalletDetail extends IWallet {
  cardNumber: string | null;
  cardStatementPassword: string | null;
  cardStatementDate: Date | null;
  totalTransaction: number;
}

export type IIcon = {
  id: string;
  url: string;
  isSystemIcon: boolean;
};

export interface BaseCategory {
  id: string;
  name: string;
  type: CategoryType;
  icon: IIcon | undefined | null;
  idParent?: string | null;
}

export interface ICategory extends BaseCategory {
  children?: BaseCategory[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  wallets: IWallet[];
  icons: IIcon[];
  categories: ICategory[];
}

export interface ITransaction {
  id: string;
  amount: number;
  category: BaseCategory | null;
  categoryParent: BaseCategory | null;

  wallet: IWalletSimple | null;
  date: Date;
  description: string | null;

  infoSync: IInfoSync | null;
  isAdjust: boolean;

  transfer: ITransfer | null;

  isNeedSplit: boolean;
  splits: ITransactionSplit[] | null;
}

export interface ITransfer {
  isTransfer: true; // Flag để dễ dàng identify transfer transaction
  walletFrom: IWalletSimple | null; // Wallet nguồn (trừ tiền)
  walletTo: IWalletSimple | null; // Wallet đích (cộng tiền)
  direction: "out" | "in"; // 'out' = transfer từ wallet này, 'in' = transfer đến wallet này
}

export interface IInfoSync {}

export interface IConfigSync {
  id: string;
  idUser: string;
  fromEmail: string;
  toWallet: string | null;

  wallet: IWallet | null;
}

export interface ITransactionSplit {
  id: string;
  amount: number;
  wallet: IWalletSimple | null;
  note: string | null;
}
