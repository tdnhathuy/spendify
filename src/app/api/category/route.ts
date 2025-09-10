import { DTOCategory } from "@/lib/dto/category.dto";
import { createApi, responseSuccess, selectCategory } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";

export const GET = createApi(async ({ idUser }) => {
  const categories = await prisma.category.findMany({
    where: { idUser },
    select: selectCategory,
  });

  console.log('categories', categories)
  const result = DTOCategory.fromDBs(categories);

  return responseSuccess(result);
});
