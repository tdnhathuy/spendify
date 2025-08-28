import { apiPath } from "@/generated/api-routes.gen";
import { WalletType } from "@/generated/prisma";
import { api } from "@/lib/configs";
import { IWallet, IWalletDetail } from "@/lib/types";

export const ServiceWallet = {
  get: () => api<IWallet[]>("get", "wallet"),

  create: (json: PayloadCreateWallet) =>
    api<IWallet>("post", "wallet", { json }),

  update: ({ id, json }: { id: string; json: PayloadCreateWallet }) => {
    const url = apiPath.wallet.id(id);
    return api<IWallet>("put", url, { json });
  },

  getDetail: (idWallet: string) => {
    const url = apiPath.wallet.id(idWallet);
    return api<IWalletDetail>("get", url);
  },
};

export interface PayloadCreateWallet {
  name: string;
  initBalance: number;
  type: WalletType;
  idIcon: string;
  cardNumber: string;
  cardStatementPassword: string;
  cardStatementDate: string;
}
