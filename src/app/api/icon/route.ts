import { DTOIcon } from "@/lib/dto/icon.dto";
import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import { NextRequest } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  const idUser = req.headers.get("x-user-id")!;

  const icons = await prisma.icon.findMany({ where: { idUser } });

  const arr = icons.map(DTOIcon.fromDB);
  return responseSuccessV2(arr);
});
