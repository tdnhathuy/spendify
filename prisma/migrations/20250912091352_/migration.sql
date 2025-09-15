/*
  Warnings:

  - You are about to drop the column `transactionTransferId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_transactionTransferId_fkey";

-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "transactionTransferId",
ADD COLUMN     "idTransfer" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_idTransfer_fkey" FOREIGN KEY ("idTransfer") REFERENCES "public"."TransactionTransfer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
