import { createApi, prisma, responseSuccess } from "@/lib/server";

export const POST = createApi(async ({ idUser, request }) => {
  const payload = (await request.json()) as PayloadCreateTransfer;
  if (!payload) return responseSuccess(true);
  await prisma.transfer.create({
    data: {
      idUser,
      fromWalletId: payload.idWalletFrom,
      toWalletId: payload.idWalletTo,
      amount: Number(payload.amount),
      transaction: {
        create: {
          idUser,
          amount: Number(payload.amount),
          date: new Date(),
          note: "Transfer",
          idWallet: null,
          idCategory: null,
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
