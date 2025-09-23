"use server";

import { prisma } from "@/lib/server";

export const toggleNeedSplit = async (idTransaction: string) => {
  return prisma.$transaction(async (tx) => {
    const { isNeedSplit } = await tx.transaction.findUniqueOrThrow({
      where: { id: idTransaction },
      select: { isNeedSplit: true },
    });

    return tx.transaction.update({
      where: { id: idTransaction },
      data: { isNeedSplit: !isNeedSplit },
      select: { isNeedSplit: true },
    });
  });
};
