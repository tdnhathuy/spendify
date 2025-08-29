import { CategoryType, Icon, IconType } from "@/generated/prisma";
import {
  defaultExpenseCategory,
  defaultIncomeCategory,
  flatIcon,
} from "@/lib/configs";
import { getSvgByFolderName, prisma } from "@/lib/server";
import { values } from "lodash";

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

type PayloadIcon = Omit<Icon, "id">;
const createIcon = (
  code: string,
  idUser: string,
  type: IconType
): PayloadIcon => {
  return {
    type,
    idUser,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...(type === "FlatIcon" ? { code, url: "" } : { url: code, code: "" }),
  };
};

export const createDefaultIcon = async (idUser: string) => {
  const bankIcons = await getSvgByFolderName("bank");
  const eWalletIcons = await getSvgByFolderName("e-wallet");

  const data: PayloadIcon[] = [
    ...values(flatIcon).map((code) => createIcon(code, idUser, "FlatIcon")),
    ...bankIcons.map((icon) => createIcon(icon, idUser, "Bank")),
    ...eWalletIcons.map((icon) => createIcon(icon, idUser, "EWallet")),
  ];

  return prisma.icon.createMany({ data });
};

export const createDefaultCategory = async (idUser: string) => {
  const userIcons = await prisma.icon.findMany({
    where: { idUser },
    select: { id: true, code: true },
  });

  const defaultIncome = defaultIncomeCategory.map((x) => ({
    name: x.name,
    idUser,
    idIcon: userIcons.find((i) => i.code === x.idIcon)?.id,
    type: "Income" as CategoryType,
  }));

  await prisma.category.createMany({ data: defaultIncome as any });

  for (const parent of defaultExpenseCategory) {
    const result = await prisma.category.create({
      data: {
        name: parent.name,
        idUser,
        idIcon: userIcons.find((x) => x.code === parent.idIcon)?.id,
        type: "Expense" as CategoryType,
      } as any,
    });

    for (const child of parent.children) {
      await prisma.category.create({
        data: {
          name: child.name,
          idUser,
          idParent: result.id,
          idIcon: userIcons.find((x) => x.code === child.idIcon)?.id,
          type: "Expense" as CategoryType,
        } as any,
      });
    }
  }

  return;
};
