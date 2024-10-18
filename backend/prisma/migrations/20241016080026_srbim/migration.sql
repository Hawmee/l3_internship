-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matricule` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(191) NOT NULL,
    `isChefService` BOOLEAN NOT NULL DEFAULT false,
    `isChefUnit` BOOLEAN NOT NULL DEFAULT false,
    `isPersCellule` BOOLEAN NOT NULL DEFAULT false,
    `isPersSecretariat` BOOLEAN NOT NULL DEFAULT false,
    `unit_id` INTEGER NULL,

    UNIQUE INDEX `Users_matricule_key`(`matricule`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `isDivision` BOOLEAN NOT NULL DEFAULT false,
    `isBureau` BOOLEAN NOT NULL DEFAULT false,
    `isDependant` BOOLEAN NOT NULL DEFAULT false,
    `division_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `Unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unit` ADD CONSTRAINT `Unit_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `Unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
