import { CategoryType } from "@/generated/prisma";
import { DTOCategory } from "@/lib/dto/category.dto";
import { createApi, responseSuccess, selectCategory } from "@/server";
import { prisma } from "@/server/prisma/prisma.server";

export const GET = createApi(async ({ idUser }) => {
  const categories = await prisma.category.findMany({
    where: { idUser },
    select: selectCategory,
  });

  const result = DTOCategory.fromDBs(categories);

  return responseSuccess(result);
});

export const POST = createApi(async ({ idUser, request }) => {
  const payload: PayloadCreateCategory = await request.json();

  await prisma.category.create({
    data: {
      idUser,
      idParent: payload.idParent ?? null,
      idIcon: payload.idIcon ?? null,
      name: payload.name ?? "",
      type: payload.type ?? "Income",
    },
  });

  return responseSuccess(true);
});

export interface PayloadCreateCategory {
  idParent: string | undefined;
  idIcon: string;
  name: string;
  type: CategoryType;
}
