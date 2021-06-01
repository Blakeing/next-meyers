/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course.slug_unique" ON "Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson.slug_unique" ON "Lesson"("slug");
