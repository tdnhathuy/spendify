-- CreateTable
CREATE TABLE "public"."SyncConfig" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fromEmail" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,

    CONSTRAINT "SyncConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SyncConfig_idUser_idx" ON "public"."SyncConfig"("idUser");

-- AddForeignKey
ALTER TABLE "public"."SyncConfig" ADD CONSTRAINT "SyncConfig_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SyncConfig" ADD CONSTRAINT "SyncConfig_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "public"."Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
