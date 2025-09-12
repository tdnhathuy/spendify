/*
  Warnings:

  - You are about to drop the column `idTransaction` on the `Transfer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[IdFromTransaction]` on the table `Transfer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[IdToTransaction]` on the table `Transfer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Transfer" DROP CONSTRAINT "Transfer_idTransaction_fkey";

-- DropIndex
DROP INDEX "public"."Transfer_idTransaction_key";

-- AlterTable
ALTER TABLE "public"."Transfer" DROP COLUMN "idTransaction",
ADD COLUMN     "IdFromTransaction" TEXT,
ADD COLUMN     "IdToTransaction" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_IdFromTransaction_key" ON "public"."Transfer"("IdFromTransaction");

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_IdToTransaction_key" ON "public"."Transfer"("IdToTransaction");

-- AddForeignKey
ALTER TABLE "public"."Transfer" ADD CONSTRAINT "Transfer_IdFromTransaction_fkey" FOREIGN KEY ("IdFromTransaction") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transfer" ADD CONSTRAINT "Transfer_IdToTransaction_fkey" FOREIGN KEY ("IdToTransaction") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
