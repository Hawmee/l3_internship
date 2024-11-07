/*
  Warnings:

  - You are about to drop the column `assiduite` on the `performances` table. All the data in the column will be lost.
  - You are about to drop the column `autonomie` on the `performances` table. All the data in the column will be lost.
  - You are about to drop the column `communication` on the `performances` table. All the data in the column will be lost.
  - You are about to drop the column `integrite` on the `performances` table. All the data in the column will be lost.
  - You are about to drop the column `ponctualite` on the `performances` table. All the data in the column will be lost.
  - You are about to drop the column `proposition_solution` on the `performances` table. All the data in the column will be lost.
  - You are about to drop the column `respect` on the `performances` table. All the data in the column will be lost.
  - You are about to drop the `attestation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `observation` to the `Performances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pertinance_pedago` to the `Performances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pertinance_pro` to the `Performances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pertinance_tech` to the `Performances` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Entretients_offre_id_fkey` ON `entretients`;

-- DropIndex
DROP INDEX `Entretients_stagiaire_id_fkey` ON `entretients`;

-- DropIndex
DROP INDEX `Offres_unite_id_fkey` ON `offres`;

-- DropIndex
DROP INDEX `Stages_offre_id_fkey` ON `stages`;

-- DropIndex
DROP INDEX `Stages_stagiaire_id_fkey` ON `stages`;

-- DropIndex
DROP INDEX `Stages_unite_id_fkey` ON `stages`;

-- DropIndex
DROP INDEX `Taches_stage_id_fkey` ON `taches`;

-- DropIndex
DROP INDEX `Unites_division_id_fkey` ON `unites`;

-- DropIndex
DROP INDEX `Users_unite_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `performances` DROP COLUMN `assiduite`,
    DROP COLUMN `autonomie`,
    DROP COLUMN `communication`,
    DROP COLUMN `integrite`,
    DROP COLUMN `ponctualite`,
    DROP COLUMN `proposition_solution`,
    DROP COLUMN `respect`,
    ADD COLUMN `observation` VARCHAR(191) NOT NULL,
    ADD COLUMN `pertinance_pedago` VARCHAR(191) NOT NULL,
    ADD COLUMN `pertinance_pro` VARCHAR(191) NOT NULL,
    ADD COLUMN `pertinance_tech` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `attestation`;

-- CreateTable
CREATE TABLE `Livrables` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `stage_id` INTEGER NULL,
    `isInforme` BOOLEAN NOT NULL DEFAULT false,
    `isNew` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Livrables_stage_id_key`(`stage_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_unite_id_fkey` FOREIGN KEY (`unite_id`) REFERENCES `Unites`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unites` ADD CONSTRAINT `Unites_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `Unites`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offres` ADD CONSTRAINT `Offres_unite_id_fkey` FOREIGN KEY (`unite_id`) REFERENCES `Unites`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stages` ADD CONSTRAINT `Stages_unite_id_fkey` FOREIGN KEY (`unite_id`) REFERENCES `Unites`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stages` ADD CONSTRAINT `Stages_stagiaire_id_fkey` FOREIGN KEY (`stagiaire_id`) REFERENCES `Stagiaires`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stages` ADD CONSTRAINT `Stages_offre_id_fkey` FOREIGN KEY (`offre_id`) REFERENCES `Offres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Livrables` ADD CONSTRAINT `Livrables_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `Stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Performances` ADD CONSTRAINT `Performances_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `Stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Taches` ADD CONSTRAINT `Taches_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `Stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entretients` ADD CONSTRAINT `Entretients_stagiaire_id_fkey` FOREIGN KEY (`stagiaire_id`) REFERENCES `Stagiaires`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entretients` ADD CONSTRAINT `Entretients_offre_id_fkey` FOREIGN KEY (`offre_id`) REFERENCES `Offres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
