-- AlterTable
ALTER TABLE "public"."IconGlobal" RENAME CONSTRAINT "SystemIcon_pkey" TO "IconGlobal_pkey";

-- AlterTable
ALTER TABLE "public"."IconUser" RENAME CONSTRAINT "UserIcon_pkey" TO "IconUser_pkey";

-- RenameForeignKey
ALTER TABLE "public"."IconUser" RENAME CONSTRAINT "UserIcon_idUser_fkey" TO "IconUser_idUser_fkey";

-- RenameIndex
ALTER INDEX "public"."SystemIcon_idFlatIcon_idx" RENAME TO "IconGlobal_idFlatIcon_idx";

-- RenameIndex
ALTER INDEX "public"."SystemIcon_url_idx" RENAME TO "IconGlobal_url_idx";

-- RenameIndex
ALTER INDEX "public"."UserIcon_idUser_idx" RENAME TO "IconUser_idUser_idx";
