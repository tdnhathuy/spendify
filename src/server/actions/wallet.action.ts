"use server";

import { prisma } from "@/server/prisma/prisma.server";
import { getAuthenticatedUser } from "@/server/helpers/with-auth.server";

export const removeSplit = async (splitId: string) => {
  const { idUser } = await getAuthenticatedUser();

  // Delete split with security check
  const deleted = await prisma.transactionSplit.deleteMany({
    where: {
      id: splitId,
      transaction: {
        idUser, // Only delete if belongs to this user
      },
    },
  });

  if (deleted.count === 0) {
    throw new Error("Split not found or unauthorized");
  }

  return { success: true };
};
