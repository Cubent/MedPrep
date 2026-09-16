-- AlterTable
ALTER TABLE "user_preferences" ADD COLUMN     "focusSystemIds" TEXT[] DEFAULT ARRAY[]::TEXT[];
