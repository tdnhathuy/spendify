import { DTOWallet } from "@/lib/dto/wallet.dto";
import { createApi, responseSuccess, selectWallet } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import type { PayloadCreateWallet } from "@/lib/services";

export const GET = createApi(async ({ idUser }) => {
  const wallets = await prisma.wallet.findMany({
    where: { idUser },
    select: selectWallet,
  });

  // // Process all wallets in parallel with optimized balance calculation
  // const walletsWithBalance = await Promise.all(
  //   wallets.map(async (wallet) => {
  //     const dto = DTOWallet.fromDB(wallet);
  //     if (!dto) return null;

  //     const currentBalance = await getCurrentByWalletId(wallet.id);
  //     return { ...dto, currentBalance };
  //   })
  // );

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
