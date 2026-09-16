-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('STEP_1', 'STEP_2_CK', 'STEP_3', 'ABIM');

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "exam" "ExamType" NOT NULL,
    "examSelectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_clerkUserId_key" ON "user_preferences"("clerkUserId");
