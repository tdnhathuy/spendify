/*
  Warnings:

  - You are about to drop the column `type` on the `Icon` table. All the data in the column will be lost.
  - You are about to drop the column `idIcon` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `idIcon` on the `Wallet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_idIcon_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_idIcon_fkey";

-- DropForeignKey
ALTER TABLE "public"."Wallet" DROP CONSTRAINT "Wallet_idIcon_fkey";

-- DropIndex
DROP INDEX "public"."Wallet_idIcon_idx";

-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "idSystemIcon" TEXT,
ADD COLUMN     "idUserIcon" TEXT;

-- AlterTable
ALTER TABLE "public"."Icon" DROP COLUMN "type",
ADD COLUMN     "group" TEXT;

-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "idIcon";

-- AlterTable
ALTER TABLE "public"."Wallet" DROP COLUMN "idIcon",
ADD COLUMN     "idSystemIcon" TEXT,
ADD COLUMN     "idUserIcon" TEXT;

-- DropEnum
DROP TYPE "public"."IconType";

-- CreateTable
CREATE TABLE "public"."IconGlobal" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "url" TEXT,
    "group" TEXT,

    CONSTRAINT "SystemIcon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SystemIcon_code_idx" ON "public"."IconGlobal"("code");

-- CreateIndex
CREATE INDEX "SystemIcon_group_idx" ON "public"."IconGlobal"("group");

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_idSystemIcon_fkey" FOREIGN KEY ("idSystemIcon") REFERENCES "public"."IconGlobal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_idUserIcon_fkey" FOREIGN KEY ("idUserIcon") REFERENCES "public"."Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_idSystemIcon_fkey" FOREIGN KEY ("idSystemIcon") REFERENCES "public"."IconGlobal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_idUserIcon_fkey" FOREIGN KEY ("idUserIcon") REFERENCES "public"."Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
