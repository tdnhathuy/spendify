import { apiPath } from "@/generated/api-routes.gen";
import { api } from "@/lib/configs";
import { IConfigSync } from "@/lib/types";

export const ServiceConfigSync = {
  get: () => api<IConfigSync[]>("get", "config-sync"),
  create: (json: any) => api("post", "config-sync", { json }),
  update: ({ id, walletId }: any) => {
    return "";
  },
};
