-- CreateEnum

CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable

ALTER TABLE "User"
ADD
    COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD
    COLUMN "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable

CREATE TABLE
    "Letter" (
        "id" SERIAL NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "published" BOOLEAN NOT NULL DEFAULT false,
        "title" VARCHAR(255) NOT NULL,
        "content" TEXT NOT NULL,
        "authorId" INTEGER,
        "deliveryDate" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
    );

-- AddForeignKey

ALTER TABLE "Letter"
ADD
    CONSTRAINT "Letter_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE
SET NULL ON UPDATE CASCADE;