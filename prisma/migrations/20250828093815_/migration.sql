-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "idTransfer" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_idTransfer_fkey" FOREIGN KEY ("idTransfer") REFERENCES "public"."Transfer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
