import { DTOIcon } from "@/lib/dto/icon.dto";
import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import { ICategory } from "@/lib/types";
import { NextRequest } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  console.time("GET CATEGORY");
  const id = req.headers.get("x-user-id")!;
  const categories = await prisma.category.findMany({
    where: { idUser: id },
    include: { icon: { select: { id: true, code: true } } },
    omit: { idUser: true, idIcon: true },
  });

  const listParent = categories.filter((x) => x.idParent === null);
  const listChild = categories.filter((x) => x.idParent !== null);

  const result: ICategory[] = listParent.map((x) => {
    return {
      id: x.id,
      name: x.name,
      type: x.type,
      icon: DTOIcon.fromObject(x.icon),

      children: listChild
        .filter((y) => y.idParent === x.id)
        .map((x) => ({
          id: x.id,
          name: x.name,
          type: x.type,
          icon: DTOIcon.fromObject(x.icon),
        })),
    };
  });

  console.timeEnd("GET CATEGORY");

  return responseSuccessV2(result);
});
