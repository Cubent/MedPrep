-- AlterTable
ALTER TABLE "user_question_attempts" ADD COLUMN     "sessionId" TEXT;

-- CreateIndex
CREATE INDEX "user_question_attempts_sessionId_idx" ON "user_question_attempts"("sessionId");

-- AddForeignKey
ALTER TABLE "user_question_attempts" ADD CONSTRAINT "user_question_attempts_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "study_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
