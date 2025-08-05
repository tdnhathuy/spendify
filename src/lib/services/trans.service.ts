import { client } from "@/lib/configs";
import { Response, ITransaction } from "@/lib/types";

export const ServiceTrans = {
  get: () =>
    client
      .get("transaction")
      .json<Response<ITransaction[]>>()
      .then((s) => s.data)
      .catch(() => []),

  create: (json: PayloadCreateTrans) => client.post("transaction", { json }),

  assignCategory: (json: PayloadAssignCategory) =>
    client
      .post("transaction/assign-category", { json })
      .json<Response<ITransaction>>()
      .then((s) => s.data),

  assignWallet: (json: PayloadAssignWallet) =>
    client
      .post("transaction/assign-wallet", { json })
      .json<Response<ITransaction>>()
      .then((s) => s.data),
};

export interface PayloadCreateTrans {
  amount: string;
  date: Date;
  desc: string;

  idWallet: string | null;
  idCategory: string | null;
}

export interface PayloadAssignCategory {
  idTransaction: string;
  idCategory: string;
}

export interface PayloadAssignWallet {
  idTransaction: string;
  idWallet: string;
}
