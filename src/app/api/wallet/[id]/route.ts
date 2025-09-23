import { DTOWallet } from "@/lib/dto/wallet.dto";
import {
  createApi,
  responseSuccess,
  selectWallet,
  selectWalletDetail,
} from "@/server";
import { prisma } from "@/server/prisma/prisma.server";
import { WalletBalanceService } from "@/lib/services/wallet-balance.service";
import { PayloadUpdateWallet } from "@/lib/services";

export const PUT = createApi(async ({ request, idUser }) => {
  const idWallet = request.nextUrl.pathname.split("/").pop()!;

  const payload: PayloadUpdateWallet = await request.json();

  const wallet = await prisma.wallet.update({
    where: { id: idWallet, idUser },
    data: {
      ...payload,
      name: payload.name,
      idIcon: payload.idIcon,
      type: payload.type,
      initBalance: payload.initBalance,
      cardNumber: payload.cardNumber ?? "",
      cardStatementPassword: payload.cardStatementPassword ?? "",
      cardStatementDate: payload.cardStatementDate
        ? new Date(payload.cardStatementDate)
        : null,
    },
    select: selectWallet,
  });
  
  // Tính balance đúng sau khi update
  const correctBalance = await WalletBalanceService.calculateBalance(idWallet, idUser);
  const walletDto = DTOWallet.fromDB(wallet);
  if (walletDto) {
    walletDto.currentBalance = correctBalance.toNumber();
  }
  
  return responseSuccess(walletDto);
});

export const DELETE = createApi(async ({ idUser, request }) => {
  const idWallet = request.nextUrl.pathname.split("/").pop()!;
  const response = await prisma.wallet.delete({
    where: { id: idWallet, idUser },
  });
  return responseSuccess(true);
});

export const GET = createApi(async ({ idUser, request }) => {
  const id = request.nextUrl.pathname.split("/").pop()!;

  const response = await prisma.wallet.findFirstOrThrow({
    where: { id, idUser },
    select: selectWalletDetail,
  });

  // Tính balance đúng
  const correctBalance = await WalletBalanceService.calculateBalance(id, idUser);
  
  const detail = DTOWallet.fromDBDetail(response);
  if (detail) {
    detail.currentBalance = correctBalance.toNumber();
  }

  return responseSuccess(detail);
});
