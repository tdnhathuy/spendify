/*
  Warnings:

  - You are about to drop the column `idTransaction` on the `TransactionInfoSync` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idInfoSync]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."TransactionInfoSync" DROP CONSTRAINT "TransactionInfoSync_idTransaction_fkey";

-- DropIndex
DROP INDEX "public"."TransactionInfoSync_idTransaction_key";

-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "idInfoSync" TEXT;

-- AlterTable
ALTER TABLE "public"."TransactionInfoSync" DROP COLUMN "idTransaction";

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_idInfoSync_key" ON "public"."Transaction"("idInfoSync");

-- CreateIndex
CREATE INDEX "Transaction_idInfoSync_idx" ON "public"."Transaction"("idInfoSync");

-- CreateIndex
CREATE INDEX "Transaction_idTransfer_idx" ON "public"."Transaction"("idTransfer");

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_idInfoSync_fkey" FOREIGN KEY ("idInfoSync") REFERENCES "public"."TransactionInfoSync"("id") ON DELETE SET NULL ON UPDATE CASCADE;
