/*
  Warnings:

  - You are about to drop the column `idEmail` on the `TransactionInfoSync` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idUser]` on the table `TransactionInfoSync` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailProvider` to the `TransactionInfoSync` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailReceived` to the `TransactionInfoSync` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailTitle` to the `TransactionInfoSync` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."TransactionInfoSync_idUser_idEmail_key";

-- AlterTable
ALTER TABLE "public"."TransactionInfoSync" DROP COLUMN "idEmail",
ADD COLUMN     "emailProvider" TEXT NOT NULL,
ADD COLUMN     "emailReceived" TEXT NOT NULL,
ADD COLUMN     "emailTitle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TransactionInfoSync_idUser_key" ON "public"."TransactionInfoSync"("idUser");
