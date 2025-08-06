import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import { PayloadCreateWallet } from "@/lib/services";
import { NextRequest } from "next/server";

export const PUT = createApiHandler(async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split("/").pop();

  const payload: PayloadCreateWallet = await req.json();
  await prisma.wallet.update({
    where: { id: id! },
    data: {
      name: payload.name,
      idIcon: payload.idIcon,
    },
  });
  return responseSuccessV2([]);
});
