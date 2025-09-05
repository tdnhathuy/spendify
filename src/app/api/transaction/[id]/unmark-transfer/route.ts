import { createApi, prisma, responseSuccess, selectTrans } from "@/lib/server";

export const POST = createApi(async ({ idUser, id }) => {
  const transaction = await prisma.transaction.update({
    where: { id, idUser },
    data: {
      transfer: { delete: true },
    },
    select: selectTrans,
  });

  return responseSuccess(transaction);
});
