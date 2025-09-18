-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "idWalletSplitTo" TEXT;

-- CreateIndex
CREATE INDEX "Transaction_idWalletSplitTo_idx" ON "public"."Transaction"("idWalletSplitTo");

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_idWalletSplitTo_fkey" FOREIGN KEY ("idWalletSplitTo") REFERENCES "public"."Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
