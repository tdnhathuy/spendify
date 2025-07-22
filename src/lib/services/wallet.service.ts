import { client } from "@/lib/api/client";
import { Response, Wallet } from "@/lib/types";

export const ServiceWallet = {
  getWallet: () => client.get("wallet").json<Response<Wallet[]>>(),
};
