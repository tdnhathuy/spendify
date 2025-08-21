import { DTOTrans } from "@/lib/dto/trans.dto";
import { createApi, responseSuccess, selectTrans } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";

export const POST = createApi(async ({ request }) => {
  const { idTransaction, idCategory } = await request.json();

  const response = await prisma.transaction.update({
    where: { id: idTransaction },
    data: { idCategory },
    select: selectTrans,
  });

  return responseSuccess(DTOTrans.fromDB(response));
});
