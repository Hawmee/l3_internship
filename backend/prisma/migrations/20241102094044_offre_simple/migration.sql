/*
  Warnings:

  - You are about to drop the column `date_debut` on the `offres` table. All the data in the column will be lost.
  - You are about to drop the column `date_fin` on the `offres` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Entretients_offre_id_fkey` ON `entretients`;

-- DropIndex
DROP INDEX `Entretients_stagiaire_id_fkey` ON `entretients`;

-- DropIndex
DROP INDEX `Offres_unite_id_fkey` ON `offres`;

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
ALTER TABLE `offres` DROP COLUMN `date_debut`,
    DROP COLUMN `date_fin`,
    ADD COLUMN `duree` INTEGER NOT NULL DEFAULT 1;

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
ALTER TABLE `Entretients` ADD CONSTRAINT `Entretients_stagiaire_id_fkey` FOREIGN KEY (`stagiaire_id`) REFERENCES `Stagiaires`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entretients` ADD CONSTRAINT `Entretients_offre_id_fkey` FOREIGN KEY (`offre_id`) REFERENCES `Offres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;