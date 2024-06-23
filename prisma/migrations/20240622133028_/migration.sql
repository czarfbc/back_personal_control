/*
  Warnings:

  - You are about to drop the column `done` on the `TodoList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "done",
ADD COLUMN     "status" "TodoStatus" NOT NULL DEFAULT 'PENDING';
