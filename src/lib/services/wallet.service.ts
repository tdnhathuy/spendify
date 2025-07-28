import { client } from "@/lib/configs";
import { WalletType } from "@/lib/model";
import { Response, Wallet } from "@/lib/types";

export const ServiceWallet = {
  get: () =>
    client
      .get("wallet")
      .json<Response<Wallet[]>>()
      .then((s) => s.data),

  create: (json: PayloadCreateWallet) =>
    client.post("wallet", { json }).json<Response<Wallet>>(),
  update: ({ id, json }: { id: string; json: PayloadCreateWallet }) =>
    client.put(`wallet/${id}`, { json }).json<Response<Wallet>>(),
};

export interface PayloadCreateWallet {
  name: string;
  initBalance: number;
  type: WalletType;
  idIcon: string;
}
