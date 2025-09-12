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

  const idTransfer = faker.database.mongodbObjectId();
  const note = `Transfer from ${nameWalletFrom} to ${nameWalletTo}`;

  const base = { idUser, idTransfer, note };

  Promise.all([
    prisma.transaction.create({
      data: {
        ...base,
        amount: amount * -1,
        idWalletTransfer: payload.idWalletTo,
        idWallet: payload.idWalletFrom,
      },
    }),

    prisma.transaction.create({
      data: {
        ...base,
        amount,
        idWalletTransfer: payload.idWalletFrom,
        idWallet: payload.idWalletTo,
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
