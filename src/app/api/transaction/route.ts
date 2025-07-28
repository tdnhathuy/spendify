import { DTOTrans } from "@/lib/dto/trans.dto";
import {
  CategoryModel,
  IconModel,
  TransactionModel,
  WalletModel,
} from "@/lib/model";
import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { PayloadCreateTrans } from "@/lib/services";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = createApiHandler(async (req) => {
  const id = req.headers.get("x-user-id");

  const idUser = new Types.ObjectId(id!);

  const [trans, cates, wallets, icons] = await Promise.all([
    TransactionModel.find({ idUser }, {}, { sort: { date: -1 } }),
    CategoryModel.find({ idUser }),
    WalletModel.find({ idUser }),
    IconModel.find({ idUser }),
  ]);

  const arr = trans.map((tr) => DTOTrans.fromClass(tr, cates, wallets, icons));

  return responseSuccessV2(arr);
});

export const POST = createApiHandler(async (req) => {
  const idUser = req.headers.get("x-user-id");
  const payload: PayloadCreateTrans = await req.json();

  const { idCategory, idWallet } = payload;

  await TransactionModel.create({
    _id: new Types.ObjectId(),
    amount: payload.amount,
    date: payload.date,
    idUser: new Types.ObjectId(idUser!),
    description: payload.desc,

    idCategory: idCategory ? new Types.ObjectId(idCategory) : null,
    idWallet: idWallet ? new Types.ObjectId(idWallet) : null,
  });
  return NextResponse.json(responseSuccessV2([]));
});
