import { DTOWallet } from "@/lib/dto/wallet.dto";
import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import type { PayloadCreateWallet } from "@/lib/services";
import { type NextRequest } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  const idUser = req.headers.get("x-user-id");

  if (idUser) {
    const { icons = [], wallets = [] } = await prisma.user.findFirstOrThrow({
      where: { id: idUser },
      select: {
        wallets: true,
        icons: true,
      },
    });

    const response = DTOWallet.fromObjects(wallets, icons);
    return responseSuccessV2(response);
  }
  return responseSuccessV2([]);
});

export const POST = createApiHandler(async (req: NextRequest) => {
  const userId = req.headers.get("x-user-id");
  const payload: PayloadCreateWallet = await req.json();

  await prisma.wallet.create({
    data: {
      name: payload.name,
      type: payload.type,
      idUser: userId!,
      idIcon: payload.idIcon!,
    },
  });

  return responseSuccessV2([]);
});
