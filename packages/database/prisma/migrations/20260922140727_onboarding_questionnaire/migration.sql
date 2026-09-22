-- CreateEnum
CREATE TYPE "PrepStage" AS ENUM ('JUST_STARTING', 'MID_WAY', 'CRAMMING');

-- CreateEnum
CREATE TYPE "TimedPreference" AS ENUM ('TIMED', 'UNTIMED');

-- CreateEnum
CREATE TYPE "NextExamPlan" AS ENUM ('YES', 'NOT_YET', 'NOT_SURE');

-- AlterTable
ALTER TABLE "user_preferences" ADD COLUMN     "isRetake" BOOLEAN,
ADD COLUMN     "nextExamPlan" "NextExamPlan",
ADD COLUMN     "prepStage" "PrepStage",
ADD COLUMN     "timedPreference" "TimedPreference";
