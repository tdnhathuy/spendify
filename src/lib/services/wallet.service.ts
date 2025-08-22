import { WalletType } from "@/generated/prisma";
import { client } from "@/lib/configs";
import { Response, IWallet, IWalletDetail } from "@/lib/types";

export const ServiceWallet = {
  get: () =>
    client
      .get("wallet")
      .json<Response<IWallet[]>>()
      .then((s) => s.data),

  create: (json: PayloadCreateWallet) =>
    client.post("wallet", { json }).json<Response<IWallet>>(),
  update: ({ id, json }: { id: string; json: PayloadCreateWallet }) =>
    client.put(`wallet/${id}`, { json }).json<Response<IWallet>>(),

  getDetail: (idWallet: string) =>
    client
      .get(`wallet/${idWallet}`)
      .json<Response<IWalletDetail>>()
      .then((s) => s.data),
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
