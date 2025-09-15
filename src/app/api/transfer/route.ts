import { createApi, prisma, responseSuccess } from "@/lib/server";
import { faker } from "@faker-js/faker";

const getWalletName = (idWallet: string) => {
  return prisma.wallet
    .findFirstOrThrow({
      where: { id: idWallet },
      select: { name: true },
    })
    .then((x) => x.name);
};

export const POST = createApi(async ({ idUser, request }) => {
  const payload = (await request.json()) as PayloadCreateTransfer;
  if (!payload) return responseSuccess(true);

  const amount = Number(payload.amount);
  const { idWalletFrom, idWalletTo } = payload;

  const nameWalletFrom = await getWalletName(idWalletFrom);
  const nameWalletTo = await getWalletName(idWalletTo);

  const note = `Transfer from ${nameWalletFrom} to ${nameWalletTo}`;

  const { id: idTransfer } = await prisma.transactionTransfer.create({
    data: { idUser, idWalletFrom, idWalletTo },
    select: { id: true },
  });

  const base = { idUser, idTransfer, note };

  Promise.all([
    prisma.transaction.create({
      data: {
        ...base,
        amount: amount * -1,
        idWallet: idWalletFrom,
      },
    }),

    prisma.transaction.create({
      data: {
        ...base,
        amount,
        idWallet: idWalletTo,
      },
    }),
  ]);

  return responseSuccess(true);
});

export interface PayloadCreateTransfer {
  idWalletFrom: string;
  idWalletTo: string;
  amount: string;
}
