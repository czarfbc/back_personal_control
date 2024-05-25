-- CreateEnum
CREATE TYPE "CategoryTransactionType" AS ENUM ('OTHER');

-- AlterTable
ALTER TABLE "CategoryTransaction" ADD COLUMN     "type" "CategoryTransactionType" DEFAULT 'OTHER',
ALTER COLUMN "name" DROP NOT NULL;
