import { DTOCategory } from "@/lib/dto/category.dto";
import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import { NextRequest } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  const id = req.headers.get("x-user-id")!;

  const { icons = [], categories = [] } = await prisma.user.findFirstOrThrow({
    where: { id },
    select: { categories: true, icons: true },
  });

  const arr = DTOCategory.fromObjects(categories, icons);
  return responseSuccessV2(arr);
});
