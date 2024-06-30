/*
  Warnings:

  - You are about to drop the column `description` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `scheduling` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "scheduling" TEXT NOT NULL;
