import { DTOUser, userProfileSelect } from "@/lib/dto/user.dto";
import {
  createApiHandler,
  responseSuccessV2,
} from "@/lib/server/helper.server";
import { prisma } from "@/lib/server/prisma.server";
import { NextRequest } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  const id = req.headers.get("x-user-id")!;

  const profile = await prisma.user.findFirstOrThrow({
    where: { id },
    select: userProfileSelect,
  });

  return responseSuccessV2(DTOUser.fromObject(profile));
});
