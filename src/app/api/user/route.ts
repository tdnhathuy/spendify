import { DTOCategory } from "@/lib/dto/category.dto";
import { DTOIcon } from "@/lib/dto/icon.dto";
import { CategoryModel, IconModel, UserModel } from "@/lib/model";
import {
  createApiHandler,
  responseSuccessV2,
} from "@/lib/server/helper.server";
import { UserProfile } from "@/lib/types";
import { NextRequest } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  const idUser = req.headers.get("x-user-id");
  if (idUser) {
    const user = await UserModel.findById(idUser);
    const icons = await IconModel.find({ idUser });
    const cates = await CategoryModel.find({ idUser });

    const categories = DTOCategory.fromClasses(cates, icons);

    const profile: UserProfile = {
      id: user?._id.toString() || "",
      name: user?.name || "",
      email: user?.email || "",
      wallets: [],
      icons: icons.map(DTOIcon.fromIcon),
      categories: categories,
    };

    console.log("profile", profile);
    return responseSuccessV2(profile);
  }
  return responseSuccessV2([]);
});
