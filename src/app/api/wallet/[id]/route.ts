import { WalletModel } from "@/lib/model";
import { createApiHandler } from "@/lib/server";
import { responseSuccess } from "@/lib/server/response.server";
import { PayloadCreateWallet } from "@/lib/services";
import { NextRequest, NextResponse } from "next/server";

export const PUT = createApiHandler(async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split("/").pop();
  const payload: PayloadCreateWallet = await req.json();
  await WalletModel.findByIdAndUpdate(id, payload);
  return NextResponse.json(responseSuccess([]));
});
