/*
  Warnings:

  - You are about to drop the column `cv_link` on the `stagiaires` table. All the data in the column will be lost.
  - You are about to drop the column `lm_link` on the `stagiaires` table. All the data in the column will be lost.
  - You are about to drop the column `niveau` on the `stagiaires` table. All the data in the column will be lost.
  - Added the required column `duree` to the `Stagiaires` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE `stagiaires` DROP COLUMN `cv_link`,
    DROP COLUMN `lm_link`,
    DROP COLUMN `niveau`,
    ADD COLUMN `cv_lien` VARCHAR(191) NULL,
    ADD COLUMN `debut_demande` DATETIME(3) NULL,
    ADD COLUMN `duree` INTEGER NOT NULL,
    ADD COLUMN `lm_lien` VARCHAR(191) NULL;

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
ALTER TABLE `Attestation` ADD CONSTRAINT `Attestation_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `Stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Performances` ADD CONSTRAINT `Performances_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `Stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Taches` ADD CONSTRAINT `Taches_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `Stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entretients` ADD CONSTRAINT `Entretients_stagiaire_id_fkey` FOREIGN KEY (`stagiaire_id`) REFERENCES `Stagiaires`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entretients` ADD CONSTRAINT `Entretients_offre_id_fkey` FOREIGN KEY (`offre_id`) REFERENCES `Offres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
