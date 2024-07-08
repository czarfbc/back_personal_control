/*
  Warnings:

  - You are about to drop the column `bankAccountsId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `bankAccountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_bankAccountsId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "bankAccountsId",
ADD COLUMN     "bankAccountId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
