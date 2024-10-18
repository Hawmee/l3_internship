-- DropIndex
DROP INDEX `Unit_division_id_fkey` ON `unit`;

-- DropIndex
DROP INDEX `Users_unit_id_fkey` ON `users`;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `Unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unit` ADD CONSTRAINT `Unit_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `Unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
