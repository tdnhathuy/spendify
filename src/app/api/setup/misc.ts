import { CategoryType } from "@/generated/prisma";
import { defaultExpenseCategory, defaultIncomeCategory } from "@/lib/configs";
import { prisma } from "@/server";

export const createDefaultConfigSync = (idUser: string) => {
  const arr = [
    "VCBDigibank@info.vietcombank.com.vn",
    "no-reply@grab.com",
    "HSBC@notification.hsbc.com.hk",
    "tpbank@tpb.com.vn",
  ];

  // return prisma.syncConfig.createMany({
  //   data: arr.map((x) => ({
  //     fromEmail: x,
  //     walletId: null,
  //     idUser,
  //   })),
  // });
  return [];
};

export const createDefaultIcon = async (idUser: string) => {};

export const createDefaultCategory = async (idUser: string) => {
  return;
};
