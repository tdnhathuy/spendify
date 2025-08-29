import { createApi, prisma, responseSuccess } from "@/lib/server";

export const DELETE = createApi(async ({ idUser, id }) => {
  await prisma.transfer.deleteMany({
    where: { transaction: { id }, idUser },
  });

  await prisma.transactionInfoSync.deleteMany({
    where: {
      transaction: { id },
      idUser,
    },
  });

  await prisma.transaction.delete({
    where: { id, idUser },
  });

  return responseSuccess(true);
});
