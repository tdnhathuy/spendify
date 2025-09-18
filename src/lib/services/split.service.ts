import { PayloadSplitTransaction } from "@/app/api/transaction/[id]/split/route";
import { apiPath } from "@/generated/api-routes.gen";
import { api } from "@/lib/configs";

export const splitService = {
  // Split một transaction sang nhiều wallet
  splitTransaction: (transactionId: string, json: PayloadSplitTransaction) =>
    api("post", `transaction/${transactionId}/split`, { json }),

  // Lấy danh sách splits của một transaction
  getSplits: (transactionId: string) =>
    api("get", `transaction/${transactionId}/splits`),
};
