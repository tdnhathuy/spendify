-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_idParent_fkey";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_idParent_fkey" FOREIGN KEY ("idParent") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
