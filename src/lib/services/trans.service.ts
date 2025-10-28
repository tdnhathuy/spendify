import { apiPath } from "@/generated/api-routes.gen";
import { client } from "@/lib/configs";
import {
  ITransaction,
  ParamsPagination,
  Response,
  ResponsePagination,
} from "@/lib/types";

export const ServiceTrans = {
  get: (params: ParamsPagination) =>
    client
      .get("transaction", { searchParams: { ...params } })
      .json<ResponsePagination<ITransaction[]>>(),

  create: (json: PayloadCreateTrans) => client.post("transaction", { json }),

  delete: (id: string) =>
    client.delete(`transaction/${id}`).json<Response<boolean>>(),

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

  split: (json: any) => {
    return "";
  },
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
