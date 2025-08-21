import { DTOTrans } from "@/lib/dto/trans.dto";
import { createApi, responseSuccess, selectTrans } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";

export const POST = createApi(async ({ request }) => {
  const { idTransaction, idWallet } = await request.json();

  const response = await prisma.transaction.update({
    where: { id: idTransaction },
    data: { idWallet },
    select: selectTrans,
  });

  return responseSuccess(DTOTrans.fromDB(response));
});
