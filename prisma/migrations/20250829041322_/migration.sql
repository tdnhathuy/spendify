-- DropForeignKey
ALTER TABLE "public"."Icon" DROP CONSTRAINT "Icon_idUser_fkey";

-- AlterTable
ALTER TABLE "public"."Icon" ADD COLUMN     "url" TEXT,
ALTER COLUMN "idUser" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Icon" ADD CONSTRAINT "Icon_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
