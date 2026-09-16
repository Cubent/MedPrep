-- DropForeignKey
ALTER TABLE "session_questions" DROP CONSTRAINT "session_questions_questionId_fkey";

-- AddForeignKey
ALTER TABLE "session_questions" ADD CONSTRAINT "session_questions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
