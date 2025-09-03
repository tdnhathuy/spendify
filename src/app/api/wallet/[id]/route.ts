import { DTOWallet } from "@/lib/dto/wallet.dto";
import {
  createApi,
  responseSuccess,
  selectWallet,
  selectWalletDetail,
} from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import { PayloadUpdateWallet } from "@/lib/services";

export const PUT = createApi(async ({ request, idUser }) => {
  const idWallet = request.nextUrl.pathname.split("/").pop()!;

  const payload: PayloadUpdateWallet = await request.json();

  const wallet = await prisma.wallet.update({
    where: { id: idWallet, idUser },
    data: {
      ...payload,
      name: payload.name,
      ...(payload.icon?.isSystemIcon
        ? { idSystemIcon: payload.icon.id }
        : { idUserIcon: payload.icon?.id }),
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
  return responseSuccess(DTOWallet.fromDB(wallet));
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

  const detail = DTOWallet.fromDBDetail(response);

  return responseSuccess(detail);
});
