import { EnumCategoryType } from "@/lib/model";

export interface Response<T> {
  data: T;
  message: string;
  status: number;
}

export type Wallet = {
  id: string;
  name: string;
  balance: number;
};
export type Icon = {
  id: string;
  code: string;
  url: string;
};

export type Category = {
  id: string;
  name: string;
  type: EnumCategoryType;
};

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  wallets: Wallet[];
  icons: Icon[];
  categories: Category[];
}
