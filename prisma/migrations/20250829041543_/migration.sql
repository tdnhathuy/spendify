/*
  Warnings:

  - Made the column `idUser` on table `Icon` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Icon" DROP CONSTRAINT "Icon_idUser_fkey";

-- AlterTable
ALTER TABLE "public"."Icon" ALTER COLUMN "code" DROP NOT NULL,
ALTER COLUMN "idUser" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Icon" ADD CONSTRAINT "Icon_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
