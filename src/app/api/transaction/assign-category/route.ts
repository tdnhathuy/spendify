import { DTOTrans } from "@/lib/dto/trans.dto";
import { createApi, responseSuccess, selectTrans } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";

export const POST = createApi(async ({ request }) => {
  const { idTransaction, idCategory } = await request.json();

  const isIncome = await prisma.category.findFirst({
    where: { id: idCategory, type: "Income" },
  });


  // Lấy giao dịch hiện tại
  const transaction = await prisma.transaction.findUnique({
    where: { id: idTransaction },
    select: { amount: true }
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  // Tính toán số tiền dựa vào loại danh mục
  const amountValue = Number(transaction.amount.toString());
  const absoluteAmount = Math.abs(amountValue);
  const finalAmount = isIncome ? absoluteAmount : -absoluteAmount;

  // Cập nhật giao dịch
  const response = await prisma.transaction.update({
    where: { id: idTransaction },
    data: { 
      idCategory,
      amount: finalAmount
    },
    select: selectTrans,
  });

  return responseSuccess(DTOTrans.fromDB(response));
});
