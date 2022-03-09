/*
  Warnings:

  - You are about to drop the column `title_jp` on the `Product` table. All the data in the column will be lost.
  - Added the required column `locale` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripePriceId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('en', 'jp');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "title_jp",
ADD COLUMN     "locale" "Locale" NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "stripePriceId" TEXT NOT NULL;
