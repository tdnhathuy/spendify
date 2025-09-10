-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "isFromTransfer" BOOLEAN DEFAULT false,
ADD COLUMN     "isToTransfer" BOOLEAN DEFAULT false;

-- CreateIndex
CREATE INDEX "Transaction_isFromTransfer_idx" ON "public"."Transaction"("isFromTransfer");

-- CreateIndex
CREATE INDEX "Transaction_isToTransfer_idx" ON "public"."Transaction"("isToTransfer");

-- RenameForeignKey
ALTER TABLE "public"."Transaction" RENAME CONSTRAINT "Transaction_idTransfer_fkey" TO "Transaction_fromTransfer_fkey";
