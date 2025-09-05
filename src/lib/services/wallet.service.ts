import { apiPath } from "@/generated/api-routes.gen";
import { WalletType } from "@/generated/prisma";
import { api } from "@/lib/configs";
import { IIcon, IWallet, IWalletDetail } from "@/lib/types";

export const ServiceWallet = {
  get: () => api<IWallet[]>("get", "wallet"),

  create: (json: PayloadCreateWallet) =>
    api<IWallet>("post", "wallet", { json }),

  update: (payload: PayloadUpdateWallet) => {
    const url = apiPath.wallet.id.$(payload.id);
    return api<IWallet>("put", url, { json: payload });
  },
  delete: (idWallet: string) => {
    const url = apiPath.wallet.id.$(idWallet);
    return api<IWallet>("delete", url);
  },

  getDetail: (idWallet: string) => {
    const url = apiPath.wallet.id.$(idWallet);
    return api<IWalletDetail>("get", url);
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
