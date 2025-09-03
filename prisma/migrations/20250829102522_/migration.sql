/*
  Warnings:

  - You are about to drop the column `idSystemIcon` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `idUserIcon` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Icon` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `Icon` table. All the data in the column will be lost.
  - You are about to drop the column `idFlatIcon` on the `Icon` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `Icon` table. All the data in the column will be lost.
  - You are about to drop the column `isSystemIcon` on the `Icon` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Icon` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Icon` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `IconGlobal` table. All the data in the column will be lost.
  - You are about to drop the column `isSystemIcon` on the `IconGlobal` table. All the data in the column will be lost.
  - You are about to drop the column `idSystemIcon` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `idUserIcon` on the `Wallet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[systemIconId]` on the table `Icon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userIconId]` on the table `Icon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `source` to the `Icon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."IconSource" AS ENUM ('System', 'User');

-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_idSystemIcon_fkey";

-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_idUserIcon_fkey";

-- DropForeignKey
ALTER TABLE "public"."Icon" DROP CONSTRAINT "Icon_idUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."Wallet" DROP CONSTRAINT "Wallet_idSystemIcon_fkey";

-- DropForeignKey
ALTER TABLE "public"."Wallet" DROP CONSTRAINT "Wallet_idUserIcon_fkey";

-- DropIndex
DROP INDEX "public"."Icon_idFlatIcon_idx";

-- DropIndex
DROP INDEX "public"."Icon_idUser_idx";

-- DropIndex
DROP INDEX "public"."SystemIcon_group_idx";

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "idSystemIcon",
DROP COLUMN "idUserIcon";

-- AlterTable
ALTER TABLE "public"."Icon" DROP COLUMN "createdAt",
DROP COLUMN "group",
DROP COLUMN "idFlatIcon",
DROP COLUMN "idUser",
DROP COLUMN "isSystemIcon",
DROP COLUMN "updatedAt",
DROP COLUMN "url",
ADD COLUMN     "source" "public"."IconSource" NOT NULL,
ADD COLUMN     "systemIconId" TEXT,
ADD COLUMN     "userIconId" TEXT;

-- AlterTable
ALTER TABLE "public"."IconGlobal" DROP COLUMN "group",
DROP COLUMN "isSystemIcon";

-- AlterTable
ALTER TABLE "public"."Wallet" DROP COLUMN "idSystemIcon",
DROP COLUMN "idUserIcon",
ADD COLUMN     "idIcon" TEXT;

-- CreateTable
CREATE TABLE "public"."IconUser" (
    "id" TEXT NOT NULL,
    "idFlatIcon" TEXT,
    "url" TEXT,
    "idUser" TEXT NOT NULL,

    CONSTRAINT "UserIcon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserIcon_idUser_idx" ON "public"."IconUser"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "Icon_systemIconId_key" ON "public"."Icon"("systemIconId");

-- CreateIndex
CREATE UNIQUE INDEX "Icon_userIconId_key" ON "public"."Icon"("userIconId");

-- CreateIndex
CREATE INDEX "Wallet_idIcon_idx" ON "public"."Wallet"("idIcon");

-- AddForeignKey
ALTER TABLE "public"."IconUser" ADD CONSTRAINT "UserIcon_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Icon" ADD CONSTRAINT "Icon_systemIconId_fkey" FOREIGN KEY ("systemIconId") REFERENCES "public"."IconGlobal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Icon" ADD CONSTRAINT "Icon_userIconId_fkey" FOREIGN KEY ("userIconId") REFERENCES "public"."IconUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_idIcon_fkey" FOREIGN KEY ("idIcon") REFERENCES "public"."Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_idIcon_fkey" FOREIGN KEY ("idIcon") REFERENCES "public"."Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
