/*
  Warnings:

  - You are about to drop the column `idTransfer` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `idWalletTransfer` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "idTransfer",
DROP COLUMN "idWalletTransfer",
ADD COLUMN     "transactionTransferId" TEXT;

-- CreateTable
CREATE TABLE "public"."TransactionTransfer" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idWalletFrom" TEXT NOT NULL,
    "idWalletTo" TEXT NOT NULL,

    CONSTRAINT "TransactionTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_transactionTransferId_fkey" FOREIGN KEY ("transactionTransferId") REFERENCES "public"."TransactionTransfer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionTransfer" ADD CONSTRAINT "TransactionTransfer_idWalletFrom_fkey" FOREIGN KEY ("idWalletFrom") REFERENCES "public"."Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionTransfer" ADD CONSTRAINT "TransactionTransfer_idWalletTo_fkey" FOREIGN KEY ("idWalletTo") REFERENCES "public"."Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
