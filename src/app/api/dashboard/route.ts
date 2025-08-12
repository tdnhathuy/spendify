import { createApiHandler, prisma, responseSuccessV2 } from "@/lib/server";

export interface DashboardInfo {
  income: number;
  expense: number;
}

export const GET = createApiHandler(async (req) => {
  const idUser = req.headers.get("x-user-id")!;
  console.log("idUser", idUser);

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
    // include: {
    //   transactions: {
    //     select: {
    //       amount: true,
    //       category: { select: { type: true } },
    //     },
    //   },
    // },
  });

  const trans = wallets.map((x) => x.transactions).flat();

  const result: DashboardInfo = {
    expense: 0,
    income: 0,
  };

  trans.forEach((x) => {
    if (x.category?.type === "Expense") {
      result.expense += Math.abs(x.amount);
    } else {
      result.income += Math.abs(x.amount);
    }
  });

  console.log("trans", trans);

  return responseSuccessV2(result);
});
