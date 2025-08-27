import { createApi, prisma, responseSuccess } from "@/lib/server";

export const DELETE = createApi(async ({ idUser, request }) => {
  const idTrans = request.nextUrl.pathname.split("/").pop()!;

  const response = await prisma.transaction.delete({
    where: { id: idTrans, idUser },
  });

  return responseSuccess(true);
});
