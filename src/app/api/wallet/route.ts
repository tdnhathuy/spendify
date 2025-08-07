import { DTOWallet } from "@/lib/dto/wallet.dto";
import {
  createApiHandler,
  responseSuccessV2,
  selectWallet,
} from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import type { PayloadCreateWallet } from "@/lib/services";
import { type NextRequest } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  console.time("GET WALLET");
  const idUser = req.headers.get("x-user-id")!;

  const wallets = await prisma.wallet.findMany({
    where: { idUser },
    select: selectWallet,
  });

  const result = wallets.map(DTOWallet.fromDB);

  console.timeEnd("GET WALLET");
  return responseSuccessV2(result);
});

export const POST = createApiHandler(async (req: NextRequest) => {
  const userId = req.headers.get("x-user-id");
  const payload: PayloadCreateWallet = await req.json();

  await prisma.wallet.create({
    data: {
      initBalance: Number(payload.initBalance),
      name: payload.name,
      type: payload.type,
      idUser: userId!,
      idIcon: payload.idIcon || null,
    },
  });

  return responseSuccessV2([]);
});
