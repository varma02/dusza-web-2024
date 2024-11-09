/*
  Warnings:

  - You are about to drop the column `approved_at` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Team` DROP COLUMN `approved_at`,
    ADD COLUMN `approved_by_school` BOOLEAN NOT NULL DEFAULT false;
