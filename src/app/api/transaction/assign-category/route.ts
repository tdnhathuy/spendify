import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import { NextRequest } from "next/server";

export const POST = createApiHandler(async (req: NextRequest) => {
  const { idTransaction, idCategory } = await req.json();

  await prisma.transaction.update({
    where: { id: idTransaction },
    data: { idCategory },
  });

  return responseSuccessV2(null);
});
