/*
  Warnings:

  - You are about to drop the column `code` on the `Icon` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Icon_code_idx";

-- AlterTable
ALTER TABLE "public"."Icon" DROP COLUMN "code",
ADD COLUMN     "idFlatIcon" TEXT;

-- CreateIndex
CREATE INDEX "Icon_idFlatIcon_idx" ON "public"."Icon"("idFlatIcon");
