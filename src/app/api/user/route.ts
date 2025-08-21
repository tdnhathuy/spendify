import { DTOUser } from "@/lib/dto/user.dto";
import { prisma, profileInclude } from "@/lib/server";
import { createApi, responseSuccess, timing } from "@/lib/server/helper.server";

export const GET = createApi(async ({ idUser }) => {
  const profile = await timing("GET INFO", () =>
    prisma.user.findUniqueOrThrow({
      where: { id: idUser },
      include: profileInclude,
    })
  );

  const user = DTOUser.fromObject(profile);

  return responseSuccess(user);
});
