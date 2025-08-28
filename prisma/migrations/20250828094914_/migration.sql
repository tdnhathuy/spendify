/*
  Warnings:

  - A unique constraint covering the columns `[idTransfer]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transaction_idTransfer_key" ON "public"."Transaction"("idTransfer");
