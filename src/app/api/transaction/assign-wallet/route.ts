import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import { NextRequest } from "next/server";

export const POST = createApiHandler(async (req: NextRequest) => {
  const { idTransaction, idWallet } = await req.json();

  const transaction = await prisma.transaction.update({
    where: { id: idTransaction },
    data: { idWallet },
  });

  return responseSuccessV2(transaction);
});
