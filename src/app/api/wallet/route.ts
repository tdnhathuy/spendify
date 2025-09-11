import { DTOWallet } from "@/lib/dto/wallet.dto";
import { createApi, responseSuccess, selectWallet } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import type { PayloadCreateWallet } from "@/lib/services";

export const GET = createApi(async ({ idUser }) => {
  const wallets = await prisma.wallet.findMany({
    where: { idUser },
    select: selectWallet,
  });

  return responseSuccess(wallets.map(DTOWallet.fromDB));
});

export const POST = createApi(async ({ idUser, request }) => {
  const payload: PayloadCreateWallet = await request.json();

  await prisma.wallet.create({
    data: {
      idUser,
      initBalance: Number(payload.initBalance),
      name: payload.name,
      type: payload.type,
      idIcon: payload.idIcon ?? null,
    },
  });

  return responseSuccess([]);
});
