import { createApi, prisma, responseSuccess } from "@/lib/server";

export const DELETE = createApi(async ({ idUser, request, id }) => {
  await prisma.transfer.deleteMany({
    where: { transaction: { id: id! }, idUser },
  });

  await prisma.transaction.delete({
    where: { id: id!, idUser },
  });

  return responseSuccess(true);
});
