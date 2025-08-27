-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "idInfoSync" TEXT;

-- CreateTable
CREATE TABLE "public"."TransactionInfoSync" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "TransactionInfoSync_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TransactionInfoSync_idUser_idx" ON "public"."TransactionInfoSync"("idUser");

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_idInfoSync_fkey" FOREIGN KEY ("idInfoSync") REFERENCES "public"."TransactionInfoSync"("id") ON DELETE SET NULL ON UPDATE CASCADE;
