import { CategoryType } from "@/generated/prisma";
import { defaultExpenseCategory, defaultIncomeCategory } from "@/lib/configs";
import { flatIcon } from "@/lib/configs/cdn.config";
import { responseSuccessV2 } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import { values } from "lodash";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const clearData = async (id: string) => {
  await prisma.icon.deleteMany({ where: { idUser: id } });
  await prisma.category.deleteMany({ where: { idUser: id } });
  await prisma.wallet.deleteMany({ where: { idUser: id } });
  await prisma.user.delete({ where: { id } });
};

const secret = process.env.AUTH_SECRET!;
export const POST = async (req: NextRequest) => {
  const token = await getToken({ req, secret });

  if (!token) return responseSuccessV2([]);
  const { email, name } = token as { email: string; name: string };

  const info = await prisma.user.findFirst({ where: { email } });
  if (info) await clearData(info.id);

  const user = await prisma.user.create({ data: { email, name } });

  const icons = values(flatIcon).map((code) => ({ code, idUser: user.id }));
  await prisma.icon.createMany({ data: icons });
  const userIcons = await prisma.icon.findMany({
    where: { idUser: user.id },
    select: { id: true, code: true },
  });

  const defaultIncome = defaultIncomeCategory.map((x) => ({
    name: x.name,
    idUser: user.id,
    idIcon: userIcons.find((i) => i.code === x.idIcon)?.id,
    type: "Income" as CategoryType,
  }));

  await prisma.category.createMany({ data: defaultIncome as any });

  for (const parent of defaultExpenseCategory) {
    const result = await prisma.category.create({
      data: {
        name: parent.name,
        idUser: user.id,
        idIcon: userIcons.find((x) => x.code === parent.idIcon)?.id,
        type: "Expense" as CategoryType,
      } as any,
    });

    for (const child of parent.children) {
      await prisma.category.create({
        data: {
          name: child.name,
          idUser: user.id,
          idParent: result.id,
          idIcon: userIcons.find((x) => x.code === child.idIcon)?.id,
          type: "Expense" as CategoryType,
        } as any,
      });
    }
  }

  return responseSuccessV2([]);
};
