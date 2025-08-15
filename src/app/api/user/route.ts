import { DTOUser } from "@/lib/dto/user.dto";
import { prisma, profileInclude } from "@/lib/server";
import { createApi, responseSuccess } from "@/lib/server/helper.server";

export const GET = createApi(async ({ idUser, timing: t }) => {
  const profile = await t("GET INFO", () =>
    prisma.user.findUniqueOrThrow({
      where: { id: idUser },
      include: profileInclude,
    })
  );

  const user = DTOUser.fromObject(profile);

  return responseSuccess(user);
});
