/*
  Warnings:

  - You are about to drop the column `created_by` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `ProgrammingLanguage` table. All the data in the column will be lost.
  - Added the required column `message` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caregory_id` to the `ProgrammingLanguage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `ProgrammingLanguage` DROP FOREIGN KEY `ProgrammingLanguage_created_by_fkey`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `created_by`;

-- AlterTable
ALTER TABLE `Notifications` DROP COLUMN `created_by`,
    ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `metadata` JSON NULL;

-- AlterTable
ALTER TABLE `ProgrammingLanguage` DROP COLUMN `created_by`,
    ADD COLUMN `caregory_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ProgrammingLanguage` ADD CONSTRAINT `ProgrammingLanguage_caregory_id_fkey` FOREIGN KEY (`caregory_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
