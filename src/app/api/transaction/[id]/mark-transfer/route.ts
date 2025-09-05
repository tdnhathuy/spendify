import {
  createApi,
  prisma,
  responseSuccess,
  selectTrans,
  selectTransfer,
} from "@/lib/server";

export const POST = createApi(async ({ request, id, idUser }) => {
  const payload: PayloadMarkTransfer = await request.json();
  const { idTransaction, idWalletTo, idWalletFrom } = payload;

  const transaction = await prisma.transaction.findFirstOrThrow({
    where: { id: idTransaction, idUser },
  });

  const transfer = await prisma.transaction.update({
    where: { id: idTransaction, idUser },
    data: {
      transfer: {
        create: {
          amount: transaction.amount,
          fromWallet: { connect: { id: idWalletFrom } },
          toWallet: { connect: { id: idWalletTo } },
          user: { connect: { id: idUser } },
        },
      },
    },
    select: selectTrans,
  });

  return responseSuccess(transfer);
});

export interface PayloadMarkTransfer {
  idTransaction: string;
  idWalletTo: string;
  idWalletFrom: string;
}
