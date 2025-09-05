import { PayloadCreateTransfer } from "@/app/api/transfer/route";
import { api } from "@/lib/configs";
import { PayloadMarkTransfer } from "@/app/api/transaction/[id]/mark-transfer/route";
import { apiPath } from "@/generated/api-routes.gen";

export const ServiceTransfer = {
  transfer: (json: PayloadCreateTransfer) => api("post", "transfer", { json }),
  markTransfer: (json: PayloadMarkTransfer) => {
    const url = apiPath.transaction.id.mark_transfer(json.idTransaction);
    return api("post", url, { json });
  },
};
