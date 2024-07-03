/*
  Warnings:

  - You are about to drop the column `name` on the `CategoryTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `CategoryTransaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[othersTypes]` on the table `CategoryTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CategoryTransaction_name_key";

-- AlterTable
ALTER TABLE "CategoryTransaction" DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "defaultTypes" "CategoryTransactionType" DEFAULT 'OTHER',
ADD COLUMN     "othersTypes" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTransaction_othersTypes_key" ON "CategoryTransaction"("othersTypes");
