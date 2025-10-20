import { PayloadCreateTransfer } from "@/app/api/transfer/route";
import { createApi, prisma, responseSuccess, selectTrans } from "@/server";

export const POST = createApi(async ({ request, id, idUser }) => {
  const payload: PayloadMarkTransfer = await request.json();
  const { idTransaction, idWalletTo, idWalletFrom } = payload;

  const transfer = await prisma.transaction.update({
    where: { id: idTransaction, idUser },
    data: {
      // idWalletTransferTo: idWalletTo,
      idWallet: idWalletFrom,
    },
    select: selectTrans,
  });

  return responseSuccess(true);
});

export interface PayloadMarkTransfer extends PayloadCreateTransfer {
  idTransaction: string;
}
