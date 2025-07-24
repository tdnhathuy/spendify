import { DTOCategory } from "@/lib/dto/categoru.dto";
import { DTOIcon } from "@/lib/dto/icon.dto";
import { CategoryModel, IconModel, UserModel } from "@/lib/model";
import { createApiHandler } from "@/lib/server/helper.server";
import { responseSuccess } from "@/lib/server/response.server";
import { UserProfile } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  const userId = req.headers.get("x-user-id");
  if (userId) {
    const user = await UserModel.findById(userId).lean();
    const icons = await IconModel.find({ userId }).lean();
    const categories = await CategoryModel.find({ userId }).lean();

    const profile: UserProfile = {
      id: user?._id.toString() || "",
      name: user?.name || "",
      email: user?.email || "",
      wallets: [],
      icons: icons.map(DTOIcon.fromIcon),
      categories: categories.map(DTOCategory.fromClass),
    };

    console.log("profile", profile);
    return NextResponse.json(responseSuccess(profile));
  }
  return NextResponse.json(responseSuccess([]));
});
