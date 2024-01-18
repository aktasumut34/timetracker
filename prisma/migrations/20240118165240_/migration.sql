/*
  Warnings:

  - You are about to drop the column `name` on the `Tracking` table. All the data in the column will be lost.
  - Added the required column `description` to the `Tracking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tracking` DROP COLUMN `name`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
