/*
  Warnings:

  - You are about to drop the column `name` on the `orders_table` table. All the data in the column will be lost.
  - Added the required column `title` to the `orders_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders_table" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;
