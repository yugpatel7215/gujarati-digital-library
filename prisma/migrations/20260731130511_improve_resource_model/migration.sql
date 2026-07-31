/*
  Warnings:

  - You are about to drop the column `coverImage` on the `resources` table. All the data in the column will be lost.
  - You are about to drop the column `pdfUrl` on the `resources` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resources" DROP COLUMN "coverImage",
DROP COLUMN "pdfUrl",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "fileUrl" TEXT,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "thumbnailUrl" TEXT;

-- CreateIndex
CREATE INDEX "resources_isFeatured_idx" ON "resources"("isFeatured");
