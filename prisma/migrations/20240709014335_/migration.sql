-- AlterTable
ALTER TABLE "CategoryTransaction" ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "category" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "CategoryTransaction" ADD CONSTRAINT "CategoryTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
