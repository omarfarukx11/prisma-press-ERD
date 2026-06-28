/*
  Warnings:

  - You are about to drop the column `authroId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `posts` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authroId_fkey";

-- DropIndex
DROP INDEX "posts_authroId_idx";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "authroId",
DROP COLUMN "comment",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "posts_authorId_idx" ON "posts"("authorId");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
