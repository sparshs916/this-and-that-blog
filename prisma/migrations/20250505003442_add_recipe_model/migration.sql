/*
  Warnings:

  - You are about to drop the column `content` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `description` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructions` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "content",
ADD COLUMN     "cookTime" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "ingredients" TEXT NOT NULL,
ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "prepTime" TEXT,
ADD COLUMN     "servings" TEXT;
