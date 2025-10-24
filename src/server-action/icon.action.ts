"use server";

import { DTOIcon } from "@/lib/dto";
import { isNotNull } from "@/lib/helpers";
import { getAuthenticatedUser, prisma, selectIcon } from "@/server";

export const getIcons = async () => {
  const { email, idUser, name } = await getAuthenticatedUser();

  const response = await prisma.icon.findMany({
    where: { OR: [{ idUser }, { isDefault: true }] },
    select: selectIcon,
  });

  const icons = response.map(DTOIcon.fromDB).filter(isNotNull);

  return icons;
};
