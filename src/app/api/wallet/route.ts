import { Types } from "mongoose";
import { type NextRequest, NextResponse } from "next/server";
import { DTOWallet } from "@/lib/dto/wallet.dto";
import { IconModel, WalletModel } from "@/lib/model";
import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { responseSuccess } from "@/lib/server/response.server";
import type { PayloadCreateWallet } from "@/lib/services";

export const GET = createApiHandler(async (req: NextRequest) => {
  const idUser = req.headers.get("x-user-id");
  if (idUser) {
    const wallets = await WalletModel.find({ idUser });
    const icons = await IconModel.find({ idUser });

    const response = wallets.map((wallet) =>
      DTOWallet.fromClass(wallet, icons)
    );

    return responseSuccessV2(response);
  }
  return responseSuccessV2([]);
});

export const POST = createApiHandler(async (req: NextRequest) => {
  const userId = req.headers.get("x-user-id");
  const payload: PayloadCreateWallet = await req.json();
  await WalletModel.create({
    ...payload,
    idIcon: new Types.ObjectId(payload.idIcon!),
    idUser: new Types.ObjectId(userId!),
    _id: new Types.ObjectId(),
  });

  return NextResponse.json(responseSuccess([]));
});
