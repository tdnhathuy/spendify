/*
  Warnings:

  - You are about to drop the column `idInfoSync` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `TransactionInfoSync` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idTransaction]` on the table `TransactionInfoSync` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUser,idEmail]` on the table `TransactionInfoSync` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idEmail` to the `TransactionInfoSync` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idTransaction` to the `TransactionInfoSync` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_idInfoSync_fkey";

-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "idInfoSync";

-- AlterTable
ALTER TABLE "public"."TransactionInfoSync" DROP COLUMN "transactionId",
ADD COLUMN     "idEmail" TEXT NOT NULL,
ADD COLUMN     "idTransaction" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TransactionInfoSync_idTransaction_key" ON "public"."TransactionInfoSync"("idTransaction");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionInfoSync_idUser_idEmail_key" ON "public"."TransactionInfoSync"("idUser", "idEmail");

-- AddForeignKey
ALTER TABLE "public"."TransactionInfoSync" ADD CONSTRAINT "TransactionInfoSync_idTransaction_fkey" FOREIGN KEY ("idTransaction") REFERENCES "public"."Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
