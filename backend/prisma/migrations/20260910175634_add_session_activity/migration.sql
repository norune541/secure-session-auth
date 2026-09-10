-- CreateEnum
CREATE TYPE "SessionActivityType" AS ENUM ('CREATED', 'REFRESHED', 'REVOKED', 'EXPIRED', 'REUSE_DETECTED', 'PASSWORD_UPDATED');

-- CreateTable
CREATE TABLE "SessionActivity" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "type" "SessionActivityType" NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SessionActivity_sessionId_createdAt_idx" ON "SessionActivity"("sessionId", "createdAt");

-- AddForeignKey
ALTER TABLE "SessionActivity" ADD CONSTRAINT "SessionActivity_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
