import { DTOIcon } from "@/lib/dto/icon.dto";
import { createApi, responseSuccess, selectIcon } from "@/server";
import { prisma } from "@/server/prisma/prisma.server";

export const GET = createApi(async ({ idUser }) => {
  const [iconUser, iconGlobal] = await Promise.all([
    prisma.icon.findMany({
      where: { iconUser: { idUser } },
      select: selectIcon,
    }),
    prisma.icon.findMany({
      where: { source: "System" },
      select: selectIcon,
    }),
  ]);

  const arr = [...iconUser, ...iconGlobal]
    .map(DTOIcon.fromDB)
    .filter((x) => x !== null);

  return responseSuccess(arr);
});
