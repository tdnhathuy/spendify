-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_idUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."Icon" DROP CONSTRAINT "Icon_idUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_idUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."TransactionSplit" DROP CONSTRAINT "TransactionSplit_idTransaction_fkey";

-- DropForeignKey
ALTER TABLE "public"."TransactionSplit" DROP CONSTRAINT "TransactionSplit_idWalletFrom_fkey";

-- DropForeignKey
ALTER TABLE "public"."TransactionSplit" DROP CONSTRAINT "TransactionSplit_idWalletTo_fkey";

-- DropForeignKey
ALTER TABLE "public"."Wallet" DROP CONSTRAINT "Wallet_idUser_fkey";

-- AlterTable
ALTER TABLE "public"."TransactionSplit" ALTER COLUMN "idWalletFrom" DROP NOT NULL,
ALTER COLUMN "idWalletTo" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Category_idParent_idx" ON "public"."Category"("idParent");

-- AddForeignKey
ALTER TABLE "public"."Icon" ADD CONSTRAINT "Icon_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionSplit" ADD CONSTRAINT "TransactionSplit_idWalletFrom_fkey" FOREIGN KEY ("idWalletFrom") REFERENCES "public"."Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionSplit" ADD CONSTRAINT "TransactionSplit_idWalletTo_fkey" FOREIGN KEY ("idWalletTo") REFERENCES "public"."Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionSplit" ADD CONSTRAINT "TransactionSplit_idTransaction_fkey" FOREIGN KEY ("idTransaction") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
