"use server";

import { DTOCategory } from "@/lib/dto";
import { getAuthenticatedUser } from "@/server/helpers";
import { prisma, selectCategory } from "@/server/prisma";

export const getCategories = async () => {
  const { idUser } = await getAuthenticatedUser();
  const categories = await prisma.category.findMany({
    where: { idUser },
    select: selectCategory,
  });

  const result = DTOCategory.fromDBs(categories);
  return result;
};
