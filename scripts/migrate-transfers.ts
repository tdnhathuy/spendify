// migrate-transfers.ts

import { prisma } from "@/lib/server/prisma.server";
import { Decimal } from "@prisma/client/runtime/library";

async function migrateTransfers() {
  try {
    console.log("Bắt đầu migration dữ liệu Transfer...");

    // Lấy tất cả Transfer hiện tại
    const transfers = await prisma.transfer.findMany({
      include: {
        fromWallet: true,
        toWallet: true,
      },
    });

    console.log(`Tìm thấy ${transfers.length} transfer cần migrate`);

    for (const transfer of transfers) {
      console.log(`Đang xử lý transfer ${transfer.id}`);

      // Kiểm tra xem đã có transaction liên kết với transfer này chưa
      const existingTransaction = await prisma.transaction.findFirst({
        where: { idTransfer: transfer.id },
      });

      if (existingTransaction) {
        console.log(
          `- Transfer ${transfer.id} đã có transaction, đang cập nhật...`
        );

        // Cập nhật transaction hiện tại thành transaction nguồn (số âm)
        await prisma.transaction.update({
          where: { id: existingTransaction.id },
          data: {
            idWallet: transfer.fromWalletId,
            amount: new Decimal(transfer.amount).negated().toString(),
            isFromTransfer: true,
            note: `Chuyển tiền đến ${transfer.toWallet.name}`,
          },
        });
        
        // Cập nhật quan hệ với fromTransaction
        await prisma.transfer.update({
          where: { id: transfer.id },
          data: {
            fromTransaction: {
              connect: { id: existingTransaction.id }
            }
          }
        });

        // Tạo transaction đích mới (số dương)
        // Tạo một transaction mới không có idTransfer, sau đó cập nhật quan hệ
        const toTransaction = await prisma.transaction.create({
          data: {
            idUser: transfer.idUser,
            idWallet: transfer.toWalletId,
            amount: transfer.amount.toString(),
            note: `Nhận tiền từ ${transfer.fromWallet.name}`,
            date: transfer.createdAt,
            isToTransfer: true,
            createdAt: transfer.createdAt,
            updatedAt: transfer.updatedAt,
          },
        });
        
        // Cập nhật quan hệ thông qua Transfer
        await prisma.transfer.update({
          where: { id: transfer.id },
          data: {
            toTransaction: {
              connect: { id: toTransaction.id }
            }
          }
        });

        console.log(`- Đã tạo transaction đích mới: ${toTransaction.id}`);
      } else {
        console.log(
          `- Transfer ${transfer.id} chưa có transaction, đang tạo mới...`
        );

        // Tạo transaction nguồn (số âm)
        const fromTransaction = await prisma.transaction.create({
          data: {
            idUser: transfer.idUser,
            idWallet: transfer.fromWalletId,
            amount: new Decimal(transfer.amount).negated().toString(),
            note: `Chuyển tiền đến ${transfer.toWallet.name}`,
            date: transfer.createdAt,
            idTransfer: transfer.id, // Chỉ transaction nguồn có idTransfer
            isFromTransfer: true,
            createdAt: transfer.createdAt,
            updatedAt: transfer.updatedAt,
          },
        });

        // Tạo transaction đích (số dương)
        const toTransaction = await prisma.transaction.create({
          data: {
            idUser: transfer.idUser,
            idWallet: transfer.toWalletId,
            amount: transfer.amount.toString(),
            note: `Nhận tiền từ ${transfer.fromWallet.name}`,
            date: transfer.createdAt,
            isToTransfer: true,
            createdAt: transfer.createdAt,
            updatedAt: transfer.updatedAt,
          },
        });
        
        // Cập nhật quan hệ thông qua Transfer
        await prisma.transfer.update({
          where: { id: transfer.id },
          data: {
            fromTransaction: {
              connect: { id: fromTransaction.id }
            },
            toTransaction: {
              connect: { id: toTransaction.id }
            }
          }
        });

        console.log(`- Đã tạo transaction nguồn: ${fromTransaction.id}`);
        console.log(`- Đã tạo transaction đích: ${toTransaction.id}`);
      }
    }

    console.log("Migration dữ liệu Transfer hoàn tất!");
  } catch (error) {
    console.error("Lỗi khi migrate dữ liệu:", error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateTransfers();
