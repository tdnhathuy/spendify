import { DTOCategory } from "@/lib/dto/category.dto";
import { CategoryModel, IconModel } from "@/lib/model";
import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { NextRequest } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  const idUser = req.headers.get("x-user-id");
  const categories = await CategoryModel.find({ idUser });
  const icons = await IconModel.find({ idUser });

  const arr = DTOCategory.fromClasses(categories, icons);
  console.log('arr', arr)
  return responseSuccessV2(arr);
});
