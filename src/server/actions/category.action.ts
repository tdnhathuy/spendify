"use server";

import { DTOIcon } from "@/lib/dto";
import { BaseCategory } from "@/lib/types";
import { withParams } from "@/server/helpers";
import { prisma, selectCategoryBase } from "@/server/prisma";

export const actionGetCategoryDetail = withParams<
  { idCategory: string },
  ICategoryDetail
>(async ({ idUser }, params) => {
  const category = await prisma.category.findFirstOrThrow({
    where: { id: params.idCategory, idUser },
    select: { ...selectCategoryBase, parent: { select: selectCategoryBase } },
  });

  return {
    category: {
      type: category.type,
      id: category.id,
      name: category.name,
      icon: DTOIcon.fromDB(category.icon),
    },
    parent: category.parent
      ? { ...category.parent, icon: DTOIcon.fromDB(category.parent.icon) }
      : null,
  };
});

export interface ICategoryDetail {
  category: BaseCategory;
  parent: BaseCategory | null;
}
