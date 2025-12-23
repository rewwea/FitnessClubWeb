/*
  Warnings:

  - You are about to drop the column `fullName` on the `Trainer` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialty` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trainer" DROP COLUMN "fullName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "specialty" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
