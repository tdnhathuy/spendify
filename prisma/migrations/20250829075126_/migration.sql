/*
  Warnings:

  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(19,4)`.
  - You are about to alter the column `amount` on the `Transfer` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(19,4)`.
  - You are about to alter the column `initBalance` on the `Wallet` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(19,4)`.
  - A unique constraint covering the columns `[idUser,name,type]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUser,provider,fromEmail,walletId]` on the table `SyncConfig` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUser,emailProvider,providerMsgId]` on the table `TransactionInfoSync` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUser,name]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerMsgId` to the `TransactionInfoSync` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `emailReceived` on the `TransactionInfoSync` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_idUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."Icon" DROP CONSTRAINT "Icon_idUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."SyncConfig" DROP CONSTRAINT "SyncConfig_idUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_idUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."TransactionInfoSync" DROP CONSTRAINT "TransactionInfoSync_idTransaction_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transfer" DROP CONSTRAINT "Transfer_idUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."Wallet" DROP CONSTRAINT "Wallet_idUser_fkey";

-- AlterTable
ALTER TABLE "public"."SyncConfig" ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'gmail';

-- AlterTable
ALTER TABLE "public"."Transaction" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(19,4);

-- AlterTable
ALTER TABLE "public"."TransactionInfoSync" ADD COLUMN     "providerMsgId" TEXT NOT NULL,
DROP COLUMN "emailReceived",
ADD COLUMN     "emailReceived" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Transfer" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(19,4);

-- AlterTable
ALTER TABLE "public"."Wallet" ALTER COLUMN "initBalance" SET DATA TYPE DECIMAL(19,4);

-- CreateIndex
CREATE UNIQUE INDEX "Category_idUser_name_type_key" ON "public"."Category"("idUser", "name", "type");

-- CreateIndex
CREATE UNIQUE INDEX "SyncConfig_idUser_provider_fromEmail_walletId_key" ON "public"."SyncConfig"("idUser", "provider", "fromEmail", "walletId");

-- CreateIndex
CREATE INDEX "Transaction_idUser_idWallet_date_idx" ON "public"."Transaction"("idUser", "idWallet", "date" DESC);

-- CreateIndex
CREATE INDEX "Transaction_idUser_idCategory_date_idx" ON "public"."Transaction"("idUser", "idCategory", "date" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionInfoSync_idUser_emailProvider_providerMsgId_key" ON "public"."TransactionInfoSync"("idUser", "emailProvider", "providerMsgId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_idUser_name_key" ON "public"."Wallet"("idUser", "name");

-- AddForeignKey
ALTER TABLE "public"."SyncConfig" ADD CONSTRAINT "SyncConfig_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Icon" ADD CONSTRAINT "Icon_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transfer" ADD CONSTRAINT "Transfer_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionInfoSync" ADD CONSTRAINT "TransactionInfoSync_idTransaction_fkey" FOREIGN KEY ("idTransaction") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
