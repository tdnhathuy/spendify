-- AlterTable
ALTER TABLE "public"."Icon" ADD COLUMN     "isSystemIcon" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."IconGlobal" ADD COLUMN     "isSystemIcon" BOOLEAN NOT NULL DEFAULT true;
