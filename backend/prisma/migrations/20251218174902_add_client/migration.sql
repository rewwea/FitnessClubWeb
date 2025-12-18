/*
  Warnings:

  - You are about to drop the column `age` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `isStudent` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `percent` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `specialty` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubscriptionPlan` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Trainer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_planId_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "age",
DROP COLUMN "isStudent",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Trainer" DROP COLUMN "isActive",
DROP COLUMN "percent",
DROP COLUMN "specialty",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "SubscriptionPlan";

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_email_key" ON "Trainer"("email");
