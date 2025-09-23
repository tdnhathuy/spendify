import { DTOTrans, DTOWallet } from "@/lib/dto";
import { prisma, selectTrans, selectWallet } from "@/server";
import { createApi, responseSuccess } from "@/server/helpers/helper.server";

export const POST = createApi(async ({ request, id, idUser }) => {
  const payload: PayloadAdjustBalance = await request.json();

  const wallet = await prisma.wallet.findFirstOrThrow({
    where: { id },
    select: selectWallet,
  });

  const { currentBalance } = DTOWallet.fromDB(wallet)!;

  const amount = payload.newBalance - currentBalance;

  const trans = await prisma.transaction.create({
    data: {
      amount,
      wallet: { connect: { id: wallet.id } },
      user: { connect: { id: idUser } },
      note: `Adjust Balance (${currentBalance.toLocaleString()} → ${payload.newBalance.toLocaleString()})`,
      date: new Date(),
      adjust: {
        create: {
          reason: `Adjust Balance (${currentBalance.toLocaleString()} → ${payload.newBalance.toLocaleString()})`,
          amount,
          idUser,
        },
      },
    },
    select: selectTrans,
  });

  return responseSuccess(DTOTrans.fromDB(trans));
});

export interface PayloadAdjustBalance {
  newBalance: number;
}
