import { DTOTrans } from "@/lib/dto/trans.dto";
import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import type { PayloadCreateTrans } from "@/lib/services";
import { NextResponse } from "next/server";

export const GET = createApiHandler(async (req) => {
  const id = req.headers.get("x-user-id")!;

  const { icons = [], transactions = [] } = await prisma.user.findFirstOrThrow({
    where: { id },
    select: { transactions: true, icons: true },
  });

  const data = DTOTrans.fromObjects(transactions);
  console.log("data", data);

  return responseSuccessV2(data);
});

export const POST = createApiHandler(async (req) => {
  const idUser = req.headers.get("x-user-id");
  const payload: PayloadCreateTrans = await req.json();

  await prisma.transaction.create({
    data: {
      amount: Number(payload.amount),
      date: payload.date,
      idUser: idUser!,
      idCategory: payload.idCategory!,
      idWallet: payload.idWallet!,
    },
  });

  return NextResponse.json(responseSuccessV2([]));
});
