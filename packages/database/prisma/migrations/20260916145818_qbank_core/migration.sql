-- CreateEnum
CREATE TYPE "ObjectiveStatus" AS ENUM ('NOT_SEEN', 'LEARNING', 'REVIEW', 'MASTERED');

-- CreateEnum
CREATE TYPE "ErrorType" AS ENUM ('CONCEPT', 'RECALL', 'CARELESS', 'TIME');

-- CreateEnum
CREATE TYPE "SessionMode" AS ENUM ('SEMESTER', 'DEDICATED', 'RESERVE');

-- CreateTable
CREATE TABLE "systems" (
    "id" TEXT NOT NULL,
    "examType" "ExamType" NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "systems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_objectives" (
    "id" TEXT NOT NULL,
    "systemId" TEXT NOT NULL,
    "examType" "ExamType" NOT NULL,
    "discipline" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "yieldWeight" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "learning_objectives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "learningObjectiveId" TEXT NOT NULL,
    "variationGroupId" TEXT NOT NULL,
    "stem" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer_choices" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "answer_choices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_objective_progress" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "learningObjectiveId" TEXT NOT NULL,
    "status" "ObjectiveStatus" NOT NULL DEFAULT 'NOT_SEEN',
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 0,
    "correctStreak" INTEGER NOT NULL DEFAULT 0,
    "nextReviewAt" TIMESTAMP(3),
    "lastAttemptAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_objective_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_question_attempts" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "chosenAnswerId" TEXT,
    "isCorrect" BOOLEAN NOT NULL,
    "errorType" "ErrorType",
    "timeSpentSeconds" INTEGER,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_question_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_sessions" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "examType" "ExamType" NOT NULL,
    "mode" "SessionMode" NOT NULL DEFAULT 'SEMESTER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "study_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_questions" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "answeredAt" TIMESTAMP(3),

    CONSTRAINT "session_questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "systems_examType_name_key" ON "systems"("examType", "name");

-- CreateIndex
CREATE INDEX "learning_objectives_examType_systemId_idx" ON "learning_objectives"("examType", "systemId");

-- CreateIndex
CREATE INDEX "questions_learningObjectiveId_idx" ON "questions"("learningObjectiveId");

-- CreateIndex
CREATE INDEX "questions_variationGroupId_idx" ON "questions"("variationGroupId");

-- CreateIndex
CREATE INDEX "user_objective_progress_clerkUserId_nextReviewAt_idx" ON "user_objective_progress"("clerkUserId", "nextReviewAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_objective_progress_clerkUserId_learningObjectiveId_key" ON "user_objective_progress"("clerkUserId", "learningObjectiveId");

-- CreateIndex
CREATE INDEX "user_question_attempts_clerkUserId_idx" ON "user_question_attempts"("clerkUserId");

-- CreateIndex
CREATE INDEX "user_question_attempts_questionId_idx" ON "user_question_attempts"("questionId");

-- AddForeignKey
ALTER TABLE "learning_objectives" ADD CONSTRAINT "learning_objectives_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "systems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_learningObjectiveId_fkey" FOREIGN KEY ("learningObjectiveId") REFERENCES "learning_objectives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer_choices" ADD CONSTRAINT "answer_choices_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_objective_progress" ADD CONSTRAINT "user_objective_progress_learningObjectiveId_fkey" FOREIGN KEY ("learningObjectiveId") REFERENCES "learning_objectives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_question_attempts" ADD CONSTRAINT "user_question_attempts_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_question_attempts" ADD CONSTRAINT "user_question_attempts_chosenAnswerId_fkey" FOREIGN KEY ("chosenAnswerId") REFERENCES "answer_choices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_questions" ADD CONSTRAINT "session_questions_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "study_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_questions" ADD CONSTRAINT "session_questions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
