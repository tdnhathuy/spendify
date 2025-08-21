/*
  Warnings:

  - You are about to drop the column `gmailRefreshToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "gmailRefreshToken";

-- CreateIndex
CREATE INDEX "Category_idUser_idx" ON "public"."Category"("idUser");

-- CreateIndex
CREATE INDEX "Category_idParent_idx" ON "public"."Category"("idParent");

-- CreateIndex
CREATE INDEX "Category_type_idx" ON "public"."Category"("type");

-- CreateIndex
CREATE INDEX "Icon_idUser_idx" ON "public"."Icon"("idUser");

-- CreateIndex
CREATE INDEX "Icon_code_idx" ON "public"."Icon"("code");

-- CreateIndex
CREATE INDEX "Transaction_idUser_date_id_idx" ON "public"."Transaction"("idUser", "date" DESC, "id" DESC);

-- CreateIndex
CREATE INDEX "Transaction_idWallet_idx" ON "public"."Transaction"("idWallet");

-- CreateIndex
CREATE INDEX "Transaction_idCategory_idx" ON "public"."Transaction"("idCategory");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "Wallet_idUser_idx" ON "public"."Wallet"("idUser");

-- CreateIndex
CREATE INDEX "Wallet_idIcon_idx" ON "public"."Wallet"("idIcon");
