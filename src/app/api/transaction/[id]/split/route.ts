import { createApi, prisma, responseSuccess } from "@/lib/server";
import { Decimal } from "@prisma/client/runtime/library";

export const POST = createApi(async ({ idUser, id, request }) => {
  const payload: PayloadTransactionSplit = await request.json();

  const { idTransaction, idWallet, amount } = payload;

  const trans = await prisma.transaction.findFirstOrThrow({
    where: { id: idTransaction },
    select: { idWallet: true, amount: true },
  });

  const delta = new Decimal(amount.toString());

  const idWalletFrom = trans.idWallet || "";
  const idWalletTo = idWallet;

  const { id: idTransfer } = await prisma.transactionTransfer.create({
    data: { idUser, idWalletFrom, idWalletTo },
    select: { id: true },
  });

  const rawAmount = Number(trans.amount);
  const newAmount = Number(amount) + Number(rawAmount);

  await Promise.all([
    prisma.transaction.update({
      where: { id: idTransaction },
      data: { amount: newAmount },
    }),

    prisma.transaction.create({
      data: {
        idUser,
        amount: Number(delta) * -1,
        idWallet: idWalletFrom,
        idTransfer,
      },
    }),

    prisma.transaction.create({
      data: {
        idUser,
        amount: Number(delta),
        idWallet: idWalletTo,
        idTransfer,
      },
    }),
  ]);

  return responseSuccess(true);
});

export interface PayloadTransactionSplit {
  idTransaction: string;
  idWallet: string;
  amount: string;
}
