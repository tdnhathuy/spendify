import { DTOWallet } from "@/lib/dto/wallet.dto";
import { createApi, responseSuccess, selectWallet } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import { WalletBalanceService } from "@/lib/services/wallet-balance.service";
import type { PayloadCreateWallet } from "@/lib/services";

export const GET = createApi(async ({ idUser }) => {
  // Lấy wallets với transactions (chỉ transfer OUT + regular transactions)
  const wallets = await prisma.wallet.findMany({
    where: { idUser },
    select: selectWallet,
  });

  // Tính balance đúng cho từng wallet (bao gồm transfer IN)
  const walletsWithCorrectBalance = await Promise.all(
    wallets.map(async (wallet) => {
      const correctBalance = await WalletBalanceService.calculateBalance(wallet.id, idUser);
      
      // Tạo wallet object với balance đúng
      const walletDto = DTOWallet.fromDB(wallet);
      if (walletDto) {
        walletDto.currentBalance = correctBalance.toNumber();
      }
      
      return walletDto;
    })
  );
  
  return responseSuccess(walletsWithCorrectBalance.filter(w => w !== null));
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
