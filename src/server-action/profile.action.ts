"use server";

import { auth } from "@/auth";
import { CategoryType, WalletType } from "@/generated/prisma";
import { defaultExpenseCategory, defaultIncomeCategory } from "@/lib/configs";
import { createWallet } from "@/server-action/wallet.action";
import { getAuthenticatedUser } from "@/server/helpers";
import { prisma } from "@/server/prisma";
import { seedSvgIcons } from "../../prisma/seed";

export async function setupProfile() {
  const session = await auth();
  const email = session?.user?.email?.trim();
  const name = session?.user?.name?.trim() || "";

  if (!email) return; // Không có email => bỏ

  // 1) PRECOMPUTE ngoài transaction (tránh chờ bên trong tx)
  const incomeData = defaultIncomeCategory
    ? await Promise.all(
        defaultIncomeCategory.map(async (income) => ({
          name: income.name,
          type: CategoryType.Income,
          idIcon: await getIdFlatIcon(income.idIcon),
        }))
      )
    : [];

  const expenseParents = defaultExpenseCategory
    ? await Promise.all(
        defaultExpenseCategory.map(async (parent) => {
          const parentIcon = await getIdFlatIcon(parent.idIcon);
          const children =
            parent.children && parent.children.length
              ? await Promise.all(
                  parent.children.map(async (child) => ({
                    name: child.name,
                    type: CategoryType.Spend,
                    idIcon: await getIdFlatIcon(child.idIcon),
                  }))
                )
              : [];
          return {
            name: parent.name,
            type: CategoryType.Spend,
            idIcon: parentIcon,
            children,
          };
        })
      )
    : [];

  // 2) Chạy trong transaction NGẮN + TĂNG timeout
  await prisma.$transaction(
    async (tx) => {
      // xoá user cũ (cascade theo schema)
      const existed = await tx.user.findUnique({ where: { email } });
      if (existed) {
        await tx.user.delete({ where: { email } });
      }

      // tạo user mới
      const { id: idUser } = await tx.user.create({
        data: { email, name },
        select: { id: true },
      });

      // Income categories -> createMany 1 lần
      if (incomeData.length) {
        await tx.category.createMany({
          data: incomeData.map((c) => ({ ...c, idUser })),
          // skipDuplicates: true, // bật nếu bạn có unique(name, user) chẳng hạn
        });
      }

      // Expense parents + nested children
      for (const p of expenseParents) {
        await tx.category.create({
          data: {
            idUser,
            name: p.name,
            type: p.type,
            idIcon: p.idIcon,
            children:
              p.children.length > 0
                ? {
                    createMany: {
                      data: p.children.map((c) => ({
                        name: c.name,
                        type: c.type, // Spend
                        idIcon: c.idIcon,
                        idUser,
                      })),
                    },
                  }
                : undefined,
          } as any,
        });
      }
    },
    {
      timeout: 15000, // ms - tăng lên tuỳ dữ liệu
      maxWait: 5000, // ms - đợi lock tối đa
    }
  );
}

const getIdFlatIcon = async (idFlatIcon: string) => {
  const result = await prisma.icon.findFirst({
    where: { idFlatIcon },
    select: { id: true },
  });

  return result?.id || null;
};

export async function setupGlobalIcons() {
  await seedSvgIcons();
}

export async function setupWallet() {
  const arrIcl = [
    { name: "Cash", balance: 4360000, type: WalletType.Cash },
    { name: "MOMO", balance: 62000, type: WalletType.Debit },
    { name: "VCB", balance: 51633056, type: WalletType.Debit },
  ];

  const arrExl = [
    { name: "Binance", balance: 220000000, type: WalletType.Crypto },
    { name: "UOB", balance: 201000000, type: WalletType.Credit },
    { name: "HSBC", balance: 200000000, type: WalletType.Credit },
    { name: "Shopee", balance: 12000000, type: WalletType.Credit },
  ];

  await prisma.wallet.deleteMany({});

  await Promise.all(
    arrIcl.map((x) =>
      createWallet({
        name: x.name,
        type: x.type,
        includeInTotal: true,
        idIcon: null,
        initBalance: x.balance,
      })
    )
  );

  await Promise.all(
    arrExl.map((x) =>
      createWallet({
        name: x.name,
        type: x.type,
        includeInTotal: false,
        idIcon: null,
        initBalance: x.balance,
      })
    )
  );
}

export async function setupCategories() {
  const { email, idUser } = await getAuthenticatedUser();

  // 1) PRECOMPUTE tất cả icon IDs NGOÀI transaction (tránh N+1 query)
  const incomeData = await Promise.all(
    defaultIncomeCategory.map(async (income) => ({
      name: income.name,
      type: CategoryType.Income,
      idIcon: await getIdFlatIcon(income.idIcon),
    }))
  );

  const expenseParents = await Promise.all(
    defaultExpenseCategory.map(async (parent) => {
      const parentIcon = await getIdFlatIcon(parent.idIcon);
      const children =
        parent.children && parent.children.length
          ? await Promise.all(
              parent.children.map(async (child) => ({
                name: child.name,
                type: CategoryType.Spend,
                idIcon: await getIdFlatIcon(child.idIcon),
              }))
            )
          : [];
      return {
        name: parent.name,
        type: CategoryType.Spend,
        idIcon: parentIcon,
        children,
      };
    })
  );

  // 2) Chạy trong transaction với timeout
  await prisma.$transaction(
    async (tx) => {
      // Xóa tất cả categories cũ của user
      await tx.category.deleteMany({ where: { idUser } });

      // Tạo Income categories (createMany 1 lần)
      if (incomeData.length) {
        await tx.category.createMany({
          data: incomeData.map((c) => ({ ...c, idUser })),
        });
      }

      // Tạo Expense parents + nested children
      for (const p of expenseParents) {
        await tx.category.create({
          data: {
            idUser,
            name: p.name,
            type: p.type,
            idIcon: p.idIcon,
            children:
              p.children.length > 0
                ? {
                    createMany: {
                      data: p.children.map((c) => ({
                        name: c.name,
                        type: c.type,
                        idIcon: c.idIcon,
                        idUser,
                      })),
                    },
                  }
                : undefined,
          } as any,
        });
      }
    },
    {
      timeout: 15000, // 15 giây
      maxWait: 5000, // 5 giây
    }
  );
}
