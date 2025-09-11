-- DropForeignKey
ALTER TABLE "public"."Transfer" DROP CONSTRAINT "Transfer_idTransaction_fkey";

-- AlterTable
ALTER TABLE "public"."TransactionInfoSync" ALTER COLUMN "idTransaction" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Transfer" ADD CONSTRAINT "Transfer_idTransaction_fkey" FOREIGN KEY ("idTransaction") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
