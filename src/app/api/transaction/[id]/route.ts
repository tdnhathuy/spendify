import { createApi, prisma, responseSuccess } from "@/lib/server";

export const DELETE = createApi(async ({ idUser, id }) => {
  await prisma.transaction.delete({ where: { id, idUser } });

  return responseSuccess(true);
});
