import { DTOTrans } from "@/lib/dto/trans.dto";
import { createApiHandler, getTrans, responseSuccessV2 } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import type { PayloadCreateTrans } from "@/lib/services";
import { NextResponse } from "next/server";

export const GET = createApiHandler(async (req) => {
  console.time("GET TRANSACTION");
  const idUser = req.headers.get("x-user-id")!;
  const transactions = await getTrans(idUser);
  const result = transactions.map(DTOTrans.fromObject);

  console.timeEnd("GET TRANSACTION");
  return responseSuccessV2(result);
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
