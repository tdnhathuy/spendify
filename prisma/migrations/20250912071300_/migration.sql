/*
  Warnings:

  - You are about to drop the `Transfer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Transfer" DROP CONSTRAINT "Transfer_IdFromTransaction_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transfer" DROP CONSTRAINT "Transfer_IdToTransaction_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transfer" DROP CONSTRAINT "Transfer_fromWalletId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transfer" DROP CONSTRAINT "Transfer_idUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transfer" DROP CONSTRAINT "Transfer_toWalletId_fkey";

-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "idWalletTransfer" TEXT,
ADD COLUMN     "includeInReport" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "public"."Transfer";
