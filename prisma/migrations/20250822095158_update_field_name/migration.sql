/*
  Warnings:

  - You are about to drop the column `cardPassword` on the `Wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Wallet" DROP COLUMN "cardPassword",
ADD COLUMN     "cardStatementPassword" TEXT DEFAULT '',
ALTER COLUMN "cardNumber" SET DEFAULT '';
