-- AlterTable
ALTER TABLE `Team` MODIFY `approved` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `approved_at` DATETIME(3) NULL;
