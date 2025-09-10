import { PayloadCreateTransfer } from "@/app/api/transfer/route";
import { createApi, prisma, responseSuccess, selectTrans } from "@/lib/server";

export const POST = createApi(async ({ request, id, idUser }) => {
  const payload: PayloadMarkTransfer = await request.json();
  const { idTransaction, idWalletTo, idWalletFrom, amount } = payload;

  // const transfer = await prisma.transaction.update({
  //   where: { id: idTransaction, idUser },
  //   data: {
  //     transfer: {
  //       create: {
  //         amount,
  //         fromWallet: { connect: { id: idWalletFrom } },
  //         toWallet: { connect: { id: idWalletTo } },
  //         user: { connect: { id: idUser } },

  //       },
  //     },
  //   },
  //   select: selectTrans,
  // });

  return responseSuccess(true);
});

export interface PayloadMarkTransfer extends PayloadCreateTransfer {
  idTransaction: string;
}
