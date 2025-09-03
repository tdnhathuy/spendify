import { CategoryType } from "@/generated/prisma";
import { defaultExpenseCategory, defaultIncomeCategory } from "@/lib/configs";
import { prisma } from "@/lib/server";

export const createDefaultConfigSync = (idUser: string) => {
  const arr = [
    "VCBDigibank@info.vietcombank.com.vn",
    "no-reply@grab.com",
    "HSBC@notification.hsbc.com.hk",
    "tpbank@tpb.com.vn",
  ];

  return prisma.syncConfig.createMany({
    data: arr.map((x) => ({
      fromEmail: x,
      walletId: null,
      idUser,
    })),
  });
};

export const createDefaultIcon = async (idUser: string) => {};

export const createDefaultCategory = async (idUser: string) => {
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

  return;
};
