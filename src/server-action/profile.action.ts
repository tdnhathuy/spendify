"use server";

import { CategoryType } from "@/generated/prisma";
import { defaultExpenseCategory, defaultIncomeCategory } from "@/lib/configs";
import { getAuthenticatedUser } from "@/server/helpers/with-auth.server";
import { prisma } from "@/server/prisma";

const syncConfig = [
  { fromEmail: "tpbank@tpb.com.vn" },
  { fromEmail: "no-reply@grab.com" },
  { fromEmail: "HSBC@notification.hsbc.com.hk" },
  { fromEmail: "VCBDigibank@info.vietcombank.com.vn" },
];

export async function setupProfile() {
  const { idUser, email, name } = await getAuthenticatedUser();

  await prisma.user.delete({ where: { id: idUser } });

  const user = await prisma.user.create({
    data: {
      email,
      name,
      syncConfig: { create: syncConfig },
    },
    select: { id: true },
  });
  await setupCategory(user.id);
}

const setupCategory = async (idUser: string) => {
  const result = await prisma.icon.findMany({
    where: { iconGlobal: { idFlatIcon: { not: null } } },
    select: {
      iconGlobal: { select: { idFlatIcon: true } },
      id: true,
    },
  });

  const systemIcon = result.map((item) => ({
    id: item.id,
    idFlatIcon: item.iconGlobal?.idFlatIcon,
  }));

  const defaultIncome = defaultIncomeCategory.map((x) => ({
    name: x.name,
    idUser,
    idIcon: systemIcon.find((i) => i.idFlatIcon === x.idIcon)?.id,
    type: "Income" as CategoryType,
  }));

  await prisma.category.createMany({ data: defaultIncome as any });

  for (const parent of defaultExpenseCategory) {
    const result = await prisma.category.create({
      data: {
        name: parent.name,
        idUser,
        idIcon: systemIcon.find((x) => x.idFlatIcon === parent.idIcon)?.id,
        type: "Expense" as CategoryType,
      } as any,
    });

    for (const child of parent.children) {
      await prisma.category.create({
        data: {
          name: child.name,
          idUser,
          idParent: result.id,
          idIcon: systemIcon.find((x) => x.idFlatIcon === child.idIcon)?.id,
          type: "Expense" as CategoryType,
        } as any,
      });
    }
  }
};
