import { WalletType } from "@/generated/prisma";
import { api } from "@/lib/configs";
import { IWallet } from "@/lib/types";

export const ServiceWallet = {
  get: () => api<IWallet[]>("get", "wallet"),

  create: (json: any) => api<IWallet>("post", "wallet", { json }),

  update: (payload: PayloadUpdateWallet) => {
    return "";
  },
  delete: (idWallet: string) => {
    return "";
  },

  getDetail: (idWallet: string) => {
    return "";
  },
};

export type PayloadUpdateWallet = PayloadCreateWallet & {
  id: string;
};

export interface PayloadCreateWallet {
  name: string;
  initBalance: number;
  type: WalletType;
  cardNumber: string;
  cardStatementPassword: string;
  cardStatementDate: string;
  includeInReport: boolean;
  idIcon: string | null;
}
