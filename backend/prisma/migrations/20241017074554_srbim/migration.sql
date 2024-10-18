/*
  Warnings:

  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `unit_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `unit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nom` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenom` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Users_unit_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `lastName`,
    DROP COLUMN `name`,
    DROP COLUMN `unit_id`,
    ADD COLUMN `nom` VARCHAR(191) NOT NULL,
    ADD COLUMN `prenom` VARCHAR(191) NOT NULL,
    ADD COLUMN `unite_id` INTEGER NULL;

-- DropTable
DROP TABLE `unit`;

-- CreateTable
CREATE TABLE `Unites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `isDivision` BOOLEAN NOT NULL DEFAULT false,
    `isBureau` BOOLEAN NOT NULL DEFAULT false,
    `isDependant` BOOLEAN NOT NULL DEFAULT false,
    `division_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Offres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `theme` VARCHAR(191) NOT NULL,
    `competence_requis` VARCHAR(191) NOT NULL,
    `date_debut` DATETIME(3) NOT NULL,
    `date_fin` DATETIME(3) NOT NULL,
    `place` INTEGER NOT NULL,
    `unite_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stagiaires` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `niveau` VARCHAR(191) NOT NULL,
    `filiere` VARCHAR(191) NOT NULL,
    `etablissement` VARCHAR(191) NOT NULL,
    `observation` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unite_id` INTEGER NOT NULL,
    `stagiaire_id` INTEGER NOT NULL,
    `theme` VARCHAR(191) NOT NULL,
    `lien_livre` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `observation` VARCHAR(191) NOT NULL,
    `date_debut` DATETIME(3) NOT NULL,
    `date_fin` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attestation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `stage_id` INTEGER NOT NULL,

    UNIQUE INDEX `Attestation_stage_id_key`(`stage_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Performances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `communication` VARCHAR(191) NOT NULL,
    `proposition_solution` VARCHAR(191) NOT NULL,
    `integrite` VARCHAR(191) NOT NULL,
    `ponctualite` VARCHAR(191) NOT NULL,
    `respect` VARCHAR(191) NOT NULL,
    `autonomie` VARCHAR(191) NOT NULL,
    `assiduite` VARCHAR(191) NOT NULL,
    `stage_id` INTEGER NOT NULL,

    UNIQUE INDEX `Performances_stage_id_key`(`stage_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Taches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `date_debut` DATETIME(3) NOT NULL,
    `date_fin` DATETIME(3) NOT NULL,
    `stage_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entretients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `date_interview` DATETIME(3) NOT NULL,
    `stagiaire_id` INTEGER NOT NULL,
    `offre_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_unite_id_fkey` FOREIGN KEY (`unite_id`) REFERENCES `Unites`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unites` ADD CONSTRAINT `Unites_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `Unites`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offres` ADD CONSTRAINT `Offres_unite_id_fkey` FOREIGN KEY (`unite_id`) REFERENCES `Unites`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stages` ADD CONSTRAINT `Stages_unite_id_fkey` FOREIGN KEY (`unite_id`) REFERENCES `Unites`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stages` ADD CONSTRAINT `Stages_stagiaire_id_fkey` FOREIGN KEY (`stagiaire_id`) REFERENCES `Stagiaires`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attestation` ADD CONSTRAINT `Attestation_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `Stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Performances` ADD CONSTRAINT `Performances_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `Stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Taches` ADD CONSTRAINT `Taches_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `Stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entretients` ADD CONSTRAINT `Entretients_stagiaire_id_fkey` FOREIGN KEY (`stagiaire_id`) REFERENCES `Stagiaires`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entretients` ADD CONSTRAINT `Entretients_offre_id_fkey` FOREIGN KEY (`offre_id`) REFERENCES `Offres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
