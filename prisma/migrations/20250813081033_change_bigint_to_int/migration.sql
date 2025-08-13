/*
  Warnings:

  - The primary key for the `folder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `folder` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `parentId` on the `folder` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `folder` DROP FOREIGN KEY `Folder_parentId_fkey`;

-- DropIndex
DROP INDEX `Folder_parentId_fkey` ON `folder`;

-- AlterTable
ALTER TABLE `folder` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `parentId` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Folder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
