import { createApi, responseSuccess } from "@/server";
import { prisma } from "@/server/prisma/prisma.server";

export const PUT = createApi(async ({ request }) => {
  const { categoryId, newParentId } = await request.json();

  // Cập nhật parent của category
  await prisma.category.update({
    where: { id: categoryId },
    data: { 
      idParent: newParentId || null 
    },
  });

  return responseSuccess(true);
});

export interface PayloadUpdateCategoryParent {
  categoryId: string;
  newParentId: string | null;
}
