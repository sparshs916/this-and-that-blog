/*
  Warnings:

  - You are about to drop the column `subject` on the `NewsletterIssue` table. All the data in the column will be lost.
  - Added the required column `title` to the `NewsletterIssue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "NewsletterStatus" ADD VALUE 'READY_TO_SEND';

-- AlterTable
ALTER TABLE "NewsletterIssue" DROP COLUMN "subject",
ADD COLUMN     "newsletterImage" TEXT,
ADD COLUMN     "scheduledAt" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';
