"use server";

import { DTOIcon } from "@/lib/dto";
import { getAuthenticatedUser, prisma, selectIcon } from "@/server";

export const getIcons = async () => {
  const { idUser } = await getAuthenticatedUser();

  const response = await prisma.icon.findMany({
    where: { OR: [{ idUser }, { isDefault: true }] },
    select: selectIcon,
  });

  const icons = DTOIcon.fromDBs(response);

  return icons;
};
