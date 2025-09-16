import { createApi, prisma, responseSuccess } from "@/lib/server";

export interface DashboardInfo {
  income: number;
  expense: number;
}

export const GET = createApi(async ({ idUser }) => {
  // Lấy tất cả transactions của user (không phân biệt wallet) 
  // chỉ tính Income/Expense, không tính Transfer
  const transactions = await prisma.transaction.findMany({
    where: {
      idUser,
      wallet: {
        includeInReport: true
      },
      category: {
        type: {
          in: ['Income', 'Expense']
        }
      },
      // Loại trừ transfer transactions
      idWalletTransferTo: null
    },
    select: {
      amount: true,
      category: { select: { type: true } },
    },
  });

  const result: DashboardInfo = {
    expense: 0,
    income: 0,
  };

  transactions.forEach((transaction) => {
    const amount = Math.abs(transaction.amount.toNumber());
    
    if (transaction.category?.type === "Income") {
      result.income += amount;
    } else if (transaction.category?.type === "Expense") {
      result.expense += amount;
    }
  });

  console.log("result", result);
  return responseSuccess(result);
});
