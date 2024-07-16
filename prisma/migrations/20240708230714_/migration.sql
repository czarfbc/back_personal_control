/*
  Warnings:

  - Made the column `categoryTransactionId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "categoryTransactionId" SET NOT NULL;
