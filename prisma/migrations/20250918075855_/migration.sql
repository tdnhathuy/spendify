/*
  Warnings:

  - You are about to drop the column `idSplitTo` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `idWalletSplitTo` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_idSplitTo_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_idWalletSplitTo_fkey";

-- DropIndex
DROP INDEX "public"."Transaction_idSplitTo_idx";

-- DropIndex
DROP INDEX "public"."Transaction_idWalletSplitTo_idx";

-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "idSplitTo",
DROP COLUMN "idWalletSplitTo";

-- CreateTable
CREATE TABLE "public"."TransactionSplit" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(19,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idTransaction" TEXT NOT NULL,
    "idWallet" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "TransactionSplit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TransactionSplit_idTransaction_idx" ON "public"."TransactionSplit"("idTransaction");

-- CreateIndex
CREATE INDEX "TransactionSplit_idWallet_idx" ON "public"."TransactionSplit"("idWallet");

-- CreateIndex
CREATE INDEX "TransactionSplit_idUser_idx" ON "public"."TransactionSplit"("idUser");

-- CreateIndex
CREATE INDEX "TransactionSplit_createdAt_idx" ON "public"."TransactionSplit"("createdAt");

-- AddForeignKey
ALTER TABLE "public"."TransactionSplit" ADD CONSTRAINT "TransactionSplit_idTransaction_fkey" FOREIGN KEY ("idTransaction") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionSplit" ADD CONSTRAINT "TransactionSplit_idWallet_fkey" FOREIGN KEY ("idWallet") REFERENCES "public"."Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionSplit" ADD CONSTRAINT "TransactionSplit_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
