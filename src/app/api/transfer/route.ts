import { createApi, prisma, responseSuccess } from "@/lib/server";

export const POST = createApi(async ({ idUser, request }) => {
  const payload = (await request.json()) as PayloadCreateTransfer;
  if (!payload) return responseSuccess(true);

  const amount = Number(payload.amount);
  await prisma.transaction.create({
    data: {
      idUser,
      amount,
      transfer: {
        create: {
          amount,
          fromWallet: { connect: { id: payload.idWalletFrom } },
          toWallet: { connect: { id: payload.idWalletTo } },
          user: { connect: { id: idUser } },
        },
      },
    },
  });

  return responseSuccess(true);
});

export interface PayloadCreateTransfer {
  idWalletFrom: string;
  idWalletTo: string;
  amount: string;
}
