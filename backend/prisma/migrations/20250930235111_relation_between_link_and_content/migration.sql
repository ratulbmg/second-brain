/*
  Warnings:

  - A unique constraint covering the columns `[contentId]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contentId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "contentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Link_contentId_key" ON "Link"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
