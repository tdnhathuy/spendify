/*
  Warnings:

  - You are about to drop the column `isAdjust` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `isFromTransfer` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `isToTransfer` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idAdjust]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Transaction_isFromTransfer_idx";

-- DropIndex
DROP INDEX "public"."Transaction_isToTransfer_idx";

-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "isAdjust",
DROP COLUMN "isFromTransfer",
DROP COLUMN "isToTransfer",
ADD COLUMN     "idAdjust" TEXT;

-- CreateTable
CREATE TABLE "public"."TransactionAdjust" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "amount" DECIMAL(19,4) NOT NULL,

    CONSTRAINT "TransactionAdjust_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TransactionAdjust_idUser_idx" ON "public"."TransactionAdjust"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_idAdjust_key" ON "public"."Transaction"("idAdjust");

-- CreateIndex
CREATE INDEX "Transaction_idAdjust_idx" ON "public"."Transaction"("idAdjust");

-- RenameForeignKey
ALTER TABLE "public"."Transaction" RENAME CONSTRAINT "Transaction_fromTransfer_fkey" TO "Transaction_idTransfer_fkey";

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_idAdjust_fkey" FOREIGN KEY ("idAdjust") REFERENCES "public"."TransactionAdjust"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionAdjust" ADD CONSTRAINT "TransactionAdjust_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
