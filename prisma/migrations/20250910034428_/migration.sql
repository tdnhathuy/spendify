/*
  Warnings:

  - You are about to drop the column `idAdjust` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `idInfoSync` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `idTransfer` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idTransaction]` on the table `TransactionAdjust` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idTransaction]` on the table `TransactionInfoSync` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idTransaction]` on the table `Transfer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idTransaction` to the `TransactionAdjust` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idTransaction` to the `TransactionInfoSync` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_idAdjust_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_idInfoSync_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_idTransfer_fkey";

-- DropIndex
DROP INDEX "public"."Transaction_idAdjust_idx";

-- DropIndex
DROP INDEX "public"."Transaction_idAdjust_key";

-- DropIndex
DROP INDEX "public"."Transaction_idInfoSync_idx";

-- DropIndex
DROP INDEX "public"."Transaction_idInfoSync_key";

-- DropIndex
DROP INDEX "public"."Transaction_idTransfer_idx";

-- DropIndex
DROP INDEX "public"."Transaction_idTransfer_key";

-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "idAdjust",
DROP COLUMN "idInfoSync",
DROP COLUMN "idTransfer";

-- AlterTable
ALTER TABLE "public"."TransactionAdjust" ADD COLUMN     "idTransaction" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."TransactionInfoSync" ADD COLUMN     "idTransaction" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Transfer" ADD COLUMN     "idTransaction" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TransactionAdjust_idTransaction_key" ON "public"."TransactionAdjust"("idTransaction");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionInfoSync_idTransaction_key" ON "public"."TransactionInfoSync"("idTransaction");

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_idTransaction_key" ON "public"."Transfer"("idTransaction");

-- AddForeignKey
ALTER TABLE "public"."Transfer" ADD CONSTRAINT "Transfer_idTransaction_fkey" FOREIGN KEY ("idTransaction") REFERENCES "public"."Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionInfoSync" ADD CONSTRAINT "TransactionInfoSync_idTransaction_fkey" FOREIGN KEY ("idTransaction") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionAdjust" ADD CONSTRAINT "TransactionAdjust_idTransaction_fkey" FOREIGN KEY ("idTransaction") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
