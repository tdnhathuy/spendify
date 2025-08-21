import { DTOTrans } from "@/lib/dto/trans.dto";
import {
  createApi,
  getParamsPaging,
  responseSuccess,
  selectTrans,
} from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
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

  const arr = trans.map(DTOTrans.fromDB);

  return responseSuccess(arr, meta);
});

export const POST = createApi(async ({ idUser, request }) => {
  const payload: PayloadCreateTrans = await request.json();

  //  await Promise.all(
  //   range(1, 500).map((tr) => {
  //     return prisma.transaction.create({
  //       data: {
  //         amount: Number(payload.amount),
  //         date: payload.date,
  //         idUser: idUser!,
  //         idCategory: "05385120-8acf-4489-9904-2088281b157c",
  //         idWallet: "354cda09-83d5-4d56-a1c3-dbad8777c464",
  //       },
  //     });
  //   })
  // );

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
