import type { CategoryType, WalletType } from "@/lib/model";

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

export type Wallet = {
  id: string;
  name: string;
  initBalance: number;
  icon: Icon | null;
  type: WalletType;
};

export type Icon = {
  id: string;
  code: string;
  url: string;
};

export interface BaseCategory {
  id: string;
  name: string;
  type: CategoryType;
  icon: Icon | null;
}

export interface Category extends BaseCategory {
  children: BaseCategory[] | null;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  wallets: Wallet[];
  icons: Icon[];
  categories: Category[];
}

export interface Transaction {
  id: string;
  amount: number;
  category: BaseCategory | null;
  categoryParent: BaseCategory | null;

  wallet: Wallet | null;
  date: Date;
  description: string | null;
}
