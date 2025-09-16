import { createApi, prisma, responseSuccess } from "@/lib/server";
import { Decimal } from "@prisma/client/runtime/library";

export const POST = createApi(async ({ idUser, id, request }) => {
  const payload: PayloadTransactionSplit = await request.json();

  const { idTransaction, idWallet, amount } = payload;

  // Lấy thông tin transaction gốc
  const originalTransaction = await prisma.transaction.findFirstOrThrow({
    where: { id: idTransaction },
    select: { idWallet: true, amount: true },
  });

  const splitAmount = new Decimal(amount.toString());
  const originalAmount = new Decimal(originalTransaction.amount.toString());
  
  // Số tiền mới của transaction gốc = số tiền cũ - số tiền chia
  const newAmount = originalAmount.minus(splitAmount);

  const idWalletFrom = originalTransaction.idWallet || "";
  const idWalletTo = idWallet;

  await Promise.all([
    // 1. Update transaction gốc với số tiền mới (trừ đi phần chia)
    prisma.transaction.update({
      where: { id: idTransaction },
      data: { amount: newAmount },
    }),

    // 2. Tạo 1 transfer transaction duy nhất (schema mới)
    prisma.transaction.create({
      data: {
        idUser,
        amount: splitAmount, // Số tiền transfer (luôn dương)
        idWallet: idWalletFrom, // Wallet nguồn (trừ tiền)
        idWalletTransferTo: idWalletTo, // Wallet đích (cộng tiền)
        note: `Split bill transfer: ${splitAmount} from original transaction`,
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
