/*
  Warnings:

  - Made the column `authorId` on table `Letter` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Letter" DROP CONSTRAINT "Letter_authorId_fkey";

-- AlterTable
ALTER TABLE "Letter" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Letter" ADD CONSTRAINT "Letter_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
