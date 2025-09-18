-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "idSplitTo" TEXT;

-- CreateIndex
CREATE INDEX "Transaction_idSplitTo_idx" ON "public"."Transaction"("idSplitTo");

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_idSplitTo_fkey" FOREIGN KEY ("idSplitTo") REFERENCES "public"."Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
