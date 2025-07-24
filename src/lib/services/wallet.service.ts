import { client } from "@/lib/configs";
import { Response, Wallet } from "@/lib/types";

export const ServiceWallet = {
  getWallet: () => client.get("wallet").json<Response<Wallet[]>>(),
};
