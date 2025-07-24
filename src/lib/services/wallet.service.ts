import { client } from "@/lib/configs";
import { WalletType } from "@/lib/model";
import { Response, Wallet } from "@/lib/types";

export const ServiceWallet = {
  get: () => client.get("wallet").json<Response<Wallet[]>>(),
  create: (json: PayloadCreateWallet) =>
    client.post("wallet", { json }).json<Response<Wallet>>(),
};

export interface PayloadCreateWallet {
  name: string;
  initBalance: number;
  type: WalletType;
  idIcon: string;
}
