import { api } from "@/lib/configs";

export const splitService = {
  // Split một transaction sang nhiều wallet
  splitTransaction: (transactionId: string, json: any) =>
    api("post", `transaction/${transactionId}/split`, { json }),

  // Lấy danh sách splits của một transaction
  getSplits: (transactionId: string) =>
    api("get", `transaction/${transactionId}/splits`),
};
