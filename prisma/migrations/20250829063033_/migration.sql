-- DropForeignKey
ALTER TABLE "public"."SyncConfig" DROP CONSTRAINT "SyncConfig_walletId_fkey";

-- AlterTable
ALTER TABLE "public"."SyncConfig" ALTER COLUMN "walletId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."SyncConfig" ADD CONSTRAINT "SyncConfig_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "public"."Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
