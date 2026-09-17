-- CreateTable
CREATE TABLE "study_guide_entries" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "learningObjectiveId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "missedCount" INTEGER NOT NULL DEFAULT 0,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "reviewedAtMissCount" INTEGER,
    "isReviewed" BOOLEAN NOT NULL DEFAULT false,
    "lastAttemptAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "study_guide_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "study_guide_entries_clerkUserId_isReviewed_idx" ON "study_guide_entries"("clerkUserId", "isReviewed");

-- CreateIndex
CREATE UNIQUE INDEX "study_guide_entries_clerkUserId_learningObjectiveId_key" ON "study_guide_entries"("clerkUserId", "learningObjectiveId");

-- AddForeignKey
ALTER TABLE "study_guide_entries" ADD CONSTRAINT "study_guide_entries_learningObjectiveId_fkey" FOREIGN KEY ("learningObjectiveId") REFERENCES "learning_objectives"("id") ON DELETE CASCADE ON UPDATE CASCADE;
