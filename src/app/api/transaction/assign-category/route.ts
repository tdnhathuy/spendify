import { createApi, responseSuccess } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";

export const POST = createApi(async ({ request }) => {
  const { idTransaction, idCategory } = await request.json();

  await prisma.transaction.update({
    where: { id: idTransaction },
    data: { idCategory },
  });

  return responseSuccess(null);
});
