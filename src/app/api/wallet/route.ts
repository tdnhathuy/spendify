import { DTOWallet } from "@/lib/dto/wallet.dto";
import { createApi, responseSuccess, selectWallet, timing } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import type { PayloadCreateWallet } from "@/lib/services";
import { type NextRequest } from "next/server";

export const GET = createApi(async ({ idUser }) => {
  const wallets = await timing("GET WALLET", () => {
    return prisma.wallet.findMany({
      where: { idUser },
      select: selectWallet,
    });
  });

  const result = wallets.map(DTOWallet.fromDB);

  return responseSuccess(result);
});

export const POST = createApi(async ({ idUser, request }) => {
  const payload: PayloadCreateWallet = await request.json();

  await prisma.wallet.create({
    data: {
      idUser,
      initBalance: Number(payload.initBalance),
      name: payload.name,
      type: payload.type,
      idIcon: payload.idIcon || null,
    },
  });

  return responseSuccess([]);
});
