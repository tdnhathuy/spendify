import { DTOTrans } from "@/lib/dto/trans.dto";
import {
  createApi,
  getParamsPaging,
  responseSuccess,
  selectTrans,
} from "@/server";
import { prisma } from "@/server/prisma/prisma.server";
import type { PayloadCreateTrans } from "@/lib/services";
import { NextResponse } from "next/server";

export const GET = createApi(async ({ idUser, request }) => {
  const { page, limit } = getParamsPaging(request);

  const [trans, meta] = await prisma.transaction
    .paginate({
      where: { idUser },
      select: selectTrans,
      orderBy: [{ date: "desc" }, { id: "desc" }],
    })
    .withPages({
      limit: Number(limit),
      page: Number(page),
      includePageCount: true,
    });

  const arr = trans.map((transaction) => DTOTrans.fromDB(transaction, idUser));

  return responseSuccess(arr, meta);
});

export const POST = createApi(async ({ idUser, request }) => {
  const payload: PayloadCreateTrans = await request.json();

  await prisma.transaction.create({
    data: {
      amount: Number(payload.amount),
      date: payload.date,
      idUser: idUser!,
      idCategory: payload.idCategory!,
      idWallet: payload.idWallet!,
    },
  });

  return NextResponse.json(responseSuccess([]));
});
