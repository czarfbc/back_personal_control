/*
  Warnings:

  - You are about to drop the column `categoryTransactionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `CategoryTransaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `transactionCategoryId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoryTransaction" DROP CONSTRAINT "CategoryTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_categoryTransactionId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "categoryTransactionId",
ADD COLUMN     "transactionCategoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CategoryTransaction";

-- CreateTable
CREATE TABLE "TransactionCategory" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "TransactionCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionCategoryId_fkey" FOREIGN KEY ("transactionCategoryId") REFERENCES "TransactionCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionCategory" ADD CONSTRAINT "TransactionCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
