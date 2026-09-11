/*
  Warnings:

  - Added the required column `userId` to the `SessionActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionActivity" ADD COLUMN     "userId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "SessionActivity_userId_createdAt_idx" ON "SessionActivity"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "SessionActivity" ADD CONSTRAINT "SessionActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
