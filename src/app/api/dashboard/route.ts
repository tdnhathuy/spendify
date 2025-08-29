import { createApi, prisma, responseSuccess } from "@/lib/server";

export interface DashboardInfo {
  income: number;
  expense: number;
}

export const GET = createApi(async ({ idUser }) => {
  const wallets = await prisma.wallet.findMany({
    where: {
      idUser,
      includeInReport: true,
    },
    select: {
      transactions: {
        select: {
          amount: true,
          category: { select: { type: true } },
        },
      },
    },
  });

  const trans = wallets.map((x) => x.transactions).flat();

  const result: DashboardInfo = {
    expense: 0,
    income: 0,
  };

  trans.forEach((x) => {
    if (x.category?.type === "Income" && x.amount.toNumber() > 0) {
      result.income += Math.abs(x.amount.toNumber());
    } else {
      result.expense += Math.abs(x.amount.toNumber());
    }
  });

  console.log("result", result);
  return responseSuccess(result);
});
