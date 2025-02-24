-- CreateTable
CREATE TABLE `categorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categorie_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Entite_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fournisseur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Fournisseur_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'associe', 'utilisateur') NOT NULL DEFAULT 'utilisateur',
    `entiteId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `derniere_connexion` DATETIME(3) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    INDEX `User_entiteId_fkey`(`entiteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commande` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `quantite` INTEGER NOT NULL,
    `montant` DECIMAL(10, 2) NOT NULL,
    `ref_facture` VARCHAR(191) NULL,
    `commentaire` VARCHAR(191) NULL,
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date_modification` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `entiteId` INTEGER NOT NULL,
    `fournisseurId` INTEGER NOT NULL,
    `initiateurId` INTEGER NOT NULL,
    `utilisateurId` INTEGER NOT NULL,
    `categorieId` INTEGER NOT NULL,
    `etat` ENUM('commande', 'expedie', 'recu', 'retourne') NOT NULL DEFAULT 'commande',

    UNIQUE INDEX `commande_ref_facture_key`(`ref_facture`),
    INDEX `commande_categorieId_idx`(`categorieId`),
    INDEX `commande_entiteId_idx`(`entiteId`),
    INDEX `commande_fournisseurId_idx`(`fournisseurId`),
    INDEX `commande_initiateurId_idx`(`initiateurId`),
    INDEX `commande_utilisateurId_idx`(`utilisateurId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `validation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `commandeId` INTEGER NOT NULL,
    `statut` ENUM('en_attente', 'approuve', 'refuse') NOT NULL,
    `date_validation` DATETIME(3) NOT NULL,
    `validateur_id` INTEGER NOT NULL,
    `commentaire` VARCHAR(191) NULL,

    UNIQUE INDEX `validation_commandeId_key`(`commandeId`),
    INDEX `validation_validateur_id_idx`(`validateur_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `entite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `categorie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `entite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_fournisseurId_fkey` FOREIGN KEY (`fournisseurId`) REFERENCES `fournisseur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_initiateurId_fkey` FOREIGN KEY (`initiateurId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `validation` ADD CONSTRAINT `validation_commandeId_fkey` FOREIGN KEY (`commandeId`) REFERENCES `commande`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `validation` ADD CONSTRAINT `validation_validateur_id_fkey` FOREIGN KEY (`validateur_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
