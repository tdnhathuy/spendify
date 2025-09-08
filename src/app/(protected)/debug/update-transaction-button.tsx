import { WiseButton } from "@/lib/components";
import { prisma } from "@/lib/server";

async function updateRandomTransaction() {
  "use server";

  const { id } = await prisma.user.findFirstOrThrow({ select: { id: true } });

  // const allTrans = await prisma.transaction.updateMany({
  //   where: { idUser: id, category: { type: "Expense" } },
  //   data: { amount: { multiply: -1 } },
  // });

  //   try {
  //     // Tìm một transaction ngẫu nhiên để cập nhật
  //     const randomTransaction = await prisma.transaction.findFirst({
  //       orderBy: {
  //         createdAt: "desc"
  //       }
  //     });

  //     if (randomTransaction) {
  //       // Cập nhật transaction với một ghi chú mới
  //       await prisma.transaction.update({
  //         where: {
  //           id: randomTransaction.id
  //         },
  //         data: {
  //           note: `Updated at ${new Date().toISOString()}`
  //         }
  //       });

  //       console.log(`Updated transaction: ${randomTransaction.id}`);
  //       revalidatePath("/debug");
  //     } else {
  //       console.log("No transaction found to update");
  //     }
  //   } catch (error) {
  //     console.error("Error updating transaction:", error);
  //   }
}

export const UpdateTransactionButton = () => {
  return (
    <form action={updateRandomTransaction}>
      <WiseButton type="submit">Update Transaction</WiseButton>
    </form>
  );
};
