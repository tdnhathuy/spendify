import { prisma } from "@/lib/server/prisma.server";

export const getTrans = (idUser: string) => {
  return prisma.transaction.findMany({
    where: { idUser },
    orderBy: { date: "desc" },
    include: {
      category: {
        include: {
          icon: { omit: { idUser: true } },
          parent: {
            omit: { idUser: true, idParent: true, idIcon: true },
            include: { icon: { omit: { idUser: true } } },
          },
        },
        omit: { idUser: true, idParent: true, idIcon: true },
      },
      user: true,
      wallet: {
        include: { icon: { omit: { idUser: true } } },
        omit: { idUser: true, idIcon: true },
      },
    },
    omit: {
      idCategory: true,
      idWallet: true,
      idUser: true,
      idIcon: true,
    },
  });
};

export type RawTransaction = Awaited<ReturnType<typeof getTrans>>[number];
export type RawCategory = RawTransaction["category"];
export type RawWallet = RawTransaction["wallet"];
