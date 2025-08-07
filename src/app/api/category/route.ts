import { DTOCategory } from "@/lib/dto/category.dto";
import {
  createApiHandler,
  responseSuccessV2,
  selectCategory,
} from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import { NextRequest } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  console.time("GET CATEGORY");
  const idUser = req.headers.get("x-user-id")!;

  const categories = await prisma.category.findMany({
    where: { idUser },
    select: selectCategory,
  });

  console.timeEnd("GET CATEGORY");

  return responseSuccessV2(DTOCategory.fromDBs(categories));
});
