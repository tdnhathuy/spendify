import { DTOTrans } from "@/lib/dto/trans.dto";
import { TransactionModel } from "@/lib/model";
import { createApiHandler, queryById, responseSuccessV2 } from "@/lib/server";
import { NextRequest } from "next/server";

export const POST = createApiHandler(async (req: NextRequest) => {
  const { idTransaction, idCategory } = await req.json();
  const idUser = req.headers.get("x-user-id")!;

  const transaction = await TransactionModel.findByIdAndUpdate(
    idTransaction,
    { idCategory },
    { new: true }
  );

  if (transaction) {
    const { categories, icons, wallets } = await queryById(idUser);
    return responseSuccessV2(
      DTOTrans.fromClass(transaction, categories, wallets, icons)
    );
  }

  return responseSuccessV2(null);
});
