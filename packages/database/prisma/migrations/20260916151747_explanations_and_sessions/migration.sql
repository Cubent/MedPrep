-- AlterTable
ALTER TABLE "answer_choices" ADD COLUMN     "explanation" TEXT;

-- AlterTable
ALTER TABLE "learning_objectives" ADD COLUMN     "summary" TEXT;

-- AlterTable
ALTER TABLE "user_question_attempts" ADD COLUMN     "isReview" BOOLEAN NOT NULL DEFAULT false;
