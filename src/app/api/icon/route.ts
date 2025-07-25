import { DTOIcon } from "@/lib/dto/icon.dto";
import { IconModel } from "@/lib/model";
import { createApiHandler, responseSuccess } from "@/lib/server";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  const idUser = req.headers.get("x-user-id");
  const icons = await IconModel.find({ idUser: new Types.ObjectId(idUser!) });
  const arr = icons.map(DTOIcon.fromIcon);
  return NextResponse.json(responseSuccess(arr));
});
