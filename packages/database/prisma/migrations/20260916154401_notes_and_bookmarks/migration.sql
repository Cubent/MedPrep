-- CreateTable
CREATE TABLE "user_question_notes" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "learningObjectiveId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_question_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_bookmarks" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_question_notes_clerkUserId_learningObjectiveId_key" ON "user_question_notes"("clerkUserId", "learningObjectiveId");

-- CreateIndex
CREATE UNIQUE INDEX "user_bookmarks_clerkUserId_questionId_key" ON "user_bookmarks"("clerkUserId", "questionId");

-- AddForeignKey
ALTER TABLE "user_question_notes" ADD CONSTRAINT "user_question_notes_learningObjectiveId_fkey" FOREIGN KEY ("learningObjectiveId") REFERENCES "learning_objectives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bookmarks" ADD CONSTRAINT "user_bookmarks_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
