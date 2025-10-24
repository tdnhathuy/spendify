import { createApi, prisma, responseSuccess } from "@/server";

export const POST = createApi(async ({ idUser, request, id }) => {
  const payload = (await request.json()) as PayloadSplitTransaction;

  const splits = payload.splits.map((split) => ({
    amount: Number(split.amount),
    idWallet: split.idWallet,
    note: split.note,
  }));

  // Create multiple splits in a transaction
  const result = await prisma.$transaction(async (tx) => {
    const createdSplits = await Promise.all(
      splits.map((split) =>
        tx.transactionSplit.create({
          data: {
            // idUser,
            idTransaction: payload.idTransaction,
            // idWallet: split.idWallet,
            idWalletTo: split.idWallet,
            amount: split.amount,
            // note: split.note || `Split ${split.amount} from transaction`,
          },
          include: {
            toWallet: { select: { id: true, name: true } },
          },
        })
      )
    );

    return createdSplits;
  });

  return responseSuccess({
    transactionId: payload.idTransaction,
    splits: result.map((split) => ({
      id: split.id,
      amount: split.amount,
      wallet: split.toWallet,
      // note: split.note,
    })),
  });
});

export interface PayloadSplitTransaction {
  idTransaction: string;
  splits: Array<{
    idWallet: string;
    amount: string;
    note?: string;
  }>;
}
