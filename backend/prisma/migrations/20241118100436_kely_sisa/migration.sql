/*
  Warnings:

  - You are about to drop the column `motif_revalidation` on the `stages` table. All the data in the column will be lost.
  - You are about to drop the column `offre_id` on the `stages` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `stages` table. All the data in the column will be lost.
  - Added the required column `theme_provisoir` to the `Stages` table without a default value. This is not possible if the table is not empty.

*/
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
ALTER TABLE `stages` DROP COLUMN `motif_revalidation`,
    DROP COLUMN `offre_id`,
    DROP COLUMN `theme`,
    ADD COLUMN `theme_definitif` VARCHAR(191) NULL,
    ADD COLUMN `theme_provisoir` VARCHAR(191) NOT NULL,
    MODIFY `isNew` BOOLEAN NOT NULL DEFAULT true;

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
ALTER TABLE `Attestation` ADD CONSTRAINT `Attestation_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `Stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Performances` ADD CONSTRAINT `Performances_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `Stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Taches` ADD CONSTRAINT `Taches_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `Stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entretients` ADD CONSTRAINT `Entretients_stagiaire_id_fkey` FOREIGN KEY (`stagiaire_id`) REFERENCES `Stagiaires`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
