import { createApi, prisma, responseSuccess } from "@/lib/server";

export const DELETE = createApi(async ({ idUser, id }) => {
  const { idTransfer } = await prisma.transaction.findFirstOrThrow({
    where: { id, idUser },
    select: { idTransfer: true },
  });

  if (idTransfer) {
    await prisma.transaction.deleteMany({ where: { idUser, idTransfer } });
  } else {
    await prisma.transaction.delete({ where: { id, idUser } });
  }

  return responseSuccess(true);
});
