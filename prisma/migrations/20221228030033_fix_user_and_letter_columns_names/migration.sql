/*
  Warnings:

  - You are about to drop the column `published` on the `Letter` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Letter" DROP COLUMN "published",
ADD COLUMN     "draft" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "active",
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
