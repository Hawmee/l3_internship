/*
  Warnings:

  - You are about to drop the column `competence_requis` on the `offres` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `offres` table. All the data in the column will be lost.
  - You are about to drop the column `date_debut` on the `taches` table. All the data in the column will be lost.
  - Added the required column `metion_requise` to the `Offres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_requise` to the `Offres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `Stagiaires` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observation` to the `Taches` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE `offres` DROP COLUMN `competence_requis`,
    DROP COLUMN `theme`,
    ADD COLUMN `metion_requise` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombre_stagiaire` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `option_requise` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `stagiaires` ADD COLUMN `theme` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `taches` DROP COLUMN `date_debut`,
    ADD COLUMN `observation` VARCHAR(191) NOT NULL;

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
