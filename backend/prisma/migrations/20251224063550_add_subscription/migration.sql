/*
  Warnings:

  - You are about to drop the column `planId` on the `ClientSubscription` table. All the data in the column will be lost.
  - Added the required column `price` to the `ClientSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `ClientSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClientSubscription" DROP CONSTRAINT "ClientSubscription_planId_fkey";

-- AlterTable
ALTER TABLE "ClientSubscription" DROP COLUMN "planId",
ADD COLUMN     "frozenFrom" TIMESTAMP(3),
ADD COLUMN     "frozenTo" TIMESTAMP(3),
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ClientSubscription" ADD CONSTRAINT "ClientSubscription_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "SubscriptionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
