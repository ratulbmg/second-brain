/*
  Warnings:

  - You are about to drop the column `contentId` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[linkId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uniqueId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_contentId_fkey";

-- DropIndex
DROP INDEX "Link_contentId_key";

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "linkId" INTEGER,
ADD COLUMN     "uniqueId" VARCHAR(100);

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "contentId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "uniqueId" VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "Content_uniqueId_key" ON "Content"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_linkId_key" ON "Content"("linkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_uniqueId_key" ON "User"("uniqueId");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE SET NULL ON UPDATE CASCADE;
