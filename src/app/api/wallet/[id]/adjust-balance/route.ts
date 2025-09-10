import { DTOTrans, DTOWallet } from "@/lib/dto";
import {
  prisma,
  selectTrans,
  selectWallet,
  selectWalletDetail,
} from "@/lib/server";
import { createApi, responseSuccess } from "@/lib/server/helper.server";

export const POST = createApi(async ({ request, id, idUser }) => {
  console.log("id", id);
  const payload: PayloadAdjustBalance = await request.json();

  const wallet = await prisma.wallet.findFirstOrThrow({
    where: { id },
    select: selectWallet,
  });

  const { currentBalance } = DTOWallet.fromDB(wallet)!;

  // Calculate the difference between new balance and current balance
  // Positive amount means adding money, negative means removing money
  const amount = payload.newBalance - currentBalance;

  const trans = await prisma.transaction.create({
    data: {
      amount,
      wallet: { connect: { id: wallet.id } },
      user: { connect: { id: idUser } },
      note: `Adjust Balance (${currentBalance.toLocaleString()} → ${payload.newBalance.toLocaleString()})`,
      date: new Date(),
    },
    select: selectTrans,
  });

  return responseSuccess(DTOTrans.fromDB(trans));
});

export interface PayloadAdjustBalance {
  newBalance: number;
}
