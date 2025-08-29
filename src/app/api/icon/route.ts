import { DTOIcon } from "@/lib/dto/icon.dto";
import { createApi, responseSuccess } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";

export const GET = createApi(async ({ idUser }) => {
  const icons = await prisma.icon.findMany({ where: { idUser } });

  const arr = icons.map(DTOIcon.fromDB);
  return responseSuccess([...arr]);
});
