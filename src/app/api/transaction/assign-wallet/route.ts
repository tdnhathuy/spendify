import { DTOTrans } from "@/lib/dto/trans.dto";
import { createApi, responseSuccess, selectTrans } from "@/server";
import { prisma } from "@/server/prisma/prisma.server";

export const POST = createApi(async ({ request }) => {
  const { idTransaction, idWallet } = await request.json();

  const response = await prisma.transaction.update({
    where: { id: idTransaction },
    data: { idWallet },
    select: selectTrans,
  });

  return responseSuccess(DTOTrans.fromDB(response));
});
