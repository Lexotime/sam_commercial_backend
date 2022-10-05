-- CreateTable
CREATE TABLE `Designation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeroArticle` VARCHAR(191) NOT NULL,
    `designationId` INTEGER NOT NULL,
    `marque` VARCHAR(20) NOT NULL,
    `prixUnitaire` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `epaisseur` INTEGER NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `dimension` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Article_numeroArticle_key`(`numeroArticle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commerciaux` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `role` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Commerciaux_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nrClient` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(20) NOT NULL,
    `adresse` VARCHAR(20) NOT NULL,
    `ville` VARCHAR(20) NOT NULL,
    `pays` VARCHAR(20) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` INTEGER NOT NULL,
    `remise` INTEGER NOT NULL,

    UNIQUE INDEX `Client_nrClient_key`(`nrClient`),
    UNIQUE INDEX `Client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Facture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numerofacture` VARCHAR(191) NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bonlivraisonid` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Facture_numerofacture_key`(`numerofacture`),
    UNIQUE INDEX `Facture_bonlivraisonid_key`(`bonlivraisonid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BonCommande` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeroCommande` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `clientId` VARCHAR(20) NOT NULL,
    `commerciauxId` INTEGER NOT NULL,

    UNIQUE INDEX `BonCommande_numeroCommande_key`(`numeroCommande`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArticleOnCommande` (
    `articleId` VARCHAR(20) NOT NULL,
    `commandeId` VARCHAR(20) NOT NULL,
    `quantite` INTEGER NOT NULL,
    `observation` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`articleId`, `commandeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BonLivraison` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeroLivraison` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `chauffeur` VARCHAR(20) NOT NULL,
    `bonCommandeId` VARCHAR(20) NOT NULL,
    `clientId` VARCHAR(20) NOT NULL,
    `commerciauxId` INTEGER NOT NULL,

    UNIQUE INDEX `BonLivraison_numeroLivraison_key`(`numeroLivraison`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArticleOnLivraison` (
    `articleId` VARCHAR(20) NOT NULL,
    `livraisonId` VARCHAR(20) NOT NULL,
    `quantite` INTEGER NOT NULL,

    PRIMARY KEY (`articleId`, `livraisonId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_designationId_fkey` FOREIGN KEY (`designationId`) REFERENCES `Designation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facture` ADD CONSTRAINT `Facture_bonlivraisonid_fkey` FOREIGN KEY (`bonlivraisonid`) REFERENCES `BonLivraison`(`numeroLivraison`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonCommande` ADD CONSTRAINT `BonCommande_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`nrClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonCommande` ADD CONSTRAINT `BonCommande_commerciauxId_fkey` FOREIGN KEY (`commerciauxId`) REFERENCES `Commerciaux`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleOnCommande` ADD CONSTRAINT `ArticleOnCommande_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`numeroArticle`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleOnCommande` ADD CONSTRAINT `ArticleOnCommande_commandeId_fkey` FOREIGN KEY (`commandeId`) REFERENCES `BonCommande`(`numeroCommande`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonLivraison` ADD CONSTRAINT `BonLivraison_bonCommandeId_fkey` FOREIGN KEY (`bonCommandeId`) REFERENCES `BonCommande`(`numeroCommande`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonLivraison` ADD CONSTRAINT `BonLivraison_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`nrClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonLivraison` ADD CONSTRAINT `BonLivraison_commerciauxId_fkey` FOREIGN KEY (`commerciauxId`) REFERENCES `Commerciaux`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleOnLivraison` ADD CONSTRAINT `ArticleOnLivraison_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`numeroArticle`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleOnLivraison` ADD CONSTRAINT `ArticleOnLivraison_livraisonId_fkey` FOREIGN KEY (`livraisonId`) REFERENCES `BonLivraison`(`numeroLivraison`) ON DELETE RESTRICT ON UPDATE CASCADE;
