import { api } from "@/lib/configs";
import { apiPath } from "@/generated/api-routes.gen";

export const ServiceTransfer = {
  transfer: (json: any) => api("post", "transfer", { json }),
  markTransfer: (json: any) => {
    return "";
  },
  unmarkTransfer: (idTransaction: string) => {
    return "";
  },
};
