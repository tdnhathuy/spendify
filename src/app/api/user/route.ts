import { DTOCategory } from "@/lib/dto/category.dto";
import { DTOWallet } from "@/lib/dto/wallet.dto";
import { prisma, profileInclude } from "@/lib/server";
import { WalletBalanceService } from "@/lib/services/wallet-balance.service";
import { createApi, responseSuccess, timing } from "@/lib/server/helper.server";

export const GET = createApi(async ({ idUser }) => {
  const profile = await timing("GET INFO", () =>
    prisma.user.findUniqueOrThrow({
      where: { id: idUser },
      include: profileInclude,
    })
  );

  // Tính balance đúng cho từng wallet
  const walletsWithCorrectBalance = await Promise.all(
    profile.wallets.map(async (wallet) => {
      const correctBalance = await WalletBalanceService.calculateBalance(wallet.id, idUser);
      
      const walletDto = DTOWallet.fromDB(wallet);
      if (walletDto) {
        walletDto.currentBalance = correctBalance.toNumber();
      }
      
      return walletDto;
    })
  );

  const categories = profile.categories
    .map(DTOCategory.fromDB)
    .filter((category) => category !== null);

  const user = {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    wallets: walletsWithCorrectBalance.filter(w => w !== null),
    icons: [],
    categories,
  };

  return responseSuccess(user);
});
