import {
  createDefaultCategory,
  createDefaultConfigSync,
  createDefaultIcon,
} from "@/app/api/setup/misc";
import { responseSuccess } from "@/server";
import { prisma } from "@/server/prisma/prisma.server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const clearData = async (idUser: string) => {
  await prisma.iconUser.deleteMany({ where: { idUser } });
  await prisma.wallet.deleteMany({ where: { idUser } });
  await prisma.category.deleteMany({ where: { idUser } });
  await prisma.syncConfig.deleteMany({ where: { idUser } });
  await prisma.transactionInfoSync.deleteMany({ where: { idUser } });
  await prisma.transaction.deleteMany({ where: { idUser } });

  await prisma.user.delete({ where: { id: idUser } });
};

const secret = process.env.AUTH_SECRET!;
export const POST = async (req: NextRequest) => {
  const token = await getToken({ req, secret });

  if (!token) return responseSuccess([]);
  const { email, name } = token as { email: string; name: string };

  const info = await prisma.user.findFirst({ where: { email } });
  if (info) await clearData(info.id);

  const user = await prisma.user.create({ data: { email, name } });

  await createDefaultIcon(user.id);
  await createDefaultConfigSync(user.id);
  await createDefaultCategory(user.id);

  return responseSuccess([]);
};
