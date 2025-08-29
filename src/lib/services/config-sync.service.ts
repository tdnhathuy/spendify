import { PayloadUpdateConfigSync } from "@/app/api/config-sync/[id]/route";
import { PayloadCreateConfigSync } from "@/app/api/config-sync/route";
import { apiPath } from "@/generated/api-routes.gen";
import { api } from "@/lib/configs";
import { IConfigSync } from "@/lib/types";

export const ServiceConfigSync = {
  get: () => api<IConfigSync[]>("get", "config-sync"),
  create: (json: PayloadCreateConfigSync) =>
    api("post", "config-sync", { json }),
  update: ({ id, walletId }: PayloadUpdateConfigSync) => {
    const url = apiPath.config_sync.id(id);
    return api("patch", url, { json: { walletId } });
  },
};
