import { PayloadCreateConfigSync } from "@/app/api/config-sync/route";
import { api } from "@/lib/configs";
import { IConfigSync } from "@/lib/types";

export const ServiceConfigSync = {
  get: () => api<IConfigSync[]>("get", "config-sync"),
  create: (json: PayloadCreateConfigSync) =>
    api("post", "config-sync", { json }),
};
