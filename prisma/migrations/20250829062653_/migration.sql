-- CreateEnum
CREATE TYPE "public"."IconType" AS ENUM ('FlatIcon', 'Bank', 'EWallet', 'Imported');

-- AlterTable
ALTER TABLE "public"."Icon" ADD COLUMN     "type" "public"."IconType" NOT NULL DEFAULT 'FlatIcon';
