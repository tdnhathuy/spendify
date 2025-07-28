import { TransactionModel } from "@/lib/model";
import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { NextRequest } from "next/server";

export const POST = createApiHandler(async (req: NextRequest) => {
  const { idTransaction, idWallet } = await req.json();

  const transaction = await TransactionModel.findByIdAndUpdate(idTransaction, {
    idWallet,
  });

  return responseSuccessV2(transaction);
});
