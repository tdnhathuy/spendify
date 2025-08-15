import { DTOTrans } from "@/lib/dto/trans.dto";
import { createApi, responseSuccess } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";

export const POST = createApi(async ({ request }) => {
  const { idTransaction, idWallet } = await request.json();

  const transaction = await prisma.transaction.update({
    where: { id: idTransaction },
    data: { idWallet },
  });

  return responseSuccess(DTOTrans.fromDB(transaction as any));
});
