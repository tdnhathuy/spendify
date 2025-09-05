-- AlterEnum
ALTER TYPE "public"."CategoryType" ADD VALUE 'Other';

-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "isDeletable" BOOLEAN NOT NULL DEFAULT false;
