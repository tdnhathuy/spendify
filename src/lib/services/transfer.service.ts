import { PayloadCreateTransfer } from "@/app/api/transfer/route";
import { api } from "@/lib/configs";

export const ServiceTransfer = {
  transfer: (json: PayloadCreateTransfer) => api("post", "transfer", { json }),
};
