/*
  Warnings:

  - You are about to drop the column `frozenFrom` on the `ClientSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `frozenTo` on the `ClientSubscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "trainerId" INTEGER;

-- AlterTable
ALTER TABLE "ClientSubscription" DROP COLUMN "frozenFrom",
DROP COLUMN "frozenTo";

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "trainerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
