-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "lastLogin" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "categories_isActive_idx" ON "categories"("isActive");
