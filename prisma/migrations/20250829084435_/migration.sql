/*
  Warnings:

  - You are about to drop the column `code` on the `IconGlobal` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."SystemIcon_code_idx";

-- AlterTable
ALTER TABLE "public"."IconGlobal" DROP COLUMN "code",
ADD COLUMN     "idFlatIcon" TEXT;

-- CreateIndex
CREATE INDEX "SystemIcon_idFlatIcon_idx" ON "public"."IconGlobal"("idFlatIcon");

-- CreateIndex
CREATE INDEX "SystemIcon_url_idx" ON "public"."IconGlobal"("url");
