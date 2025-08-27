import { createApi, prisma, responseSuccess } from "@/lib/server";

export const GET = createApi(async ({ idUser }) => {
  const config = await prisma.syncConfig.findMany({
    where: { idUser },
  });
  return responseSuccess(config);
});

export const POST = createApi(async ({ request, idUser }) => {
  const body = (await request.json()) as { walletId: string; email: string };
  console.log("body", body);

  await prisma.syncConfig.create({
    data: {
      idUser,
      walletId: body.walletId,
      fromEmail: body.email,
    },
  });

  return responseSuccess(true);
});
