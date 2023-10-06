-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `cpf` VARCHAR(45) NOT NULL,
    `platform_id` INTEGER NOT NULL,

    INDEX `fk_accounts_platform1_idx`(`platform_id`),
    PRIMARY KEY (`id`, `platform_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `cpf` VARCHAR(45) NULL,
    `adress` VARCHAR(45) NULL,
    `placeWork` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment processor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paymentType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(45) NOT NULL,
    `installments` VARCHAR(45) NOT NULL,
    `rate_id` INTEGER NOT NULL,
    `rate_payment processor_id` INTEGER NOT NULL,

    INDEX `fk_paymentType_rate1_idx`(`rate_id`, `rate_payment processor_id`),
    PRIMARY KEY (`id`, `rate_id`, `rate_payment processor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `platform` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prodPurchase` (
    `purchase_id` INTEGER NOT NULL,
    `produto_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `salePrice` INTEGER NOT NULL,
    `porcentProfit` INTEGER NOT NULL,

    INDEX `fk_purchase_has_produto_produto1_idx`(`produto_id`),
    INDEX `fk_purchase_has_produto_purchase1_idx`(`purchase_id`),
    PRIMARY KEY (`purchase_id`, `produto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prodRequest` (
    `produto_id` INTEGER NOT NULL,
    `request_id` INTEGER NOT NULL,
    `purchasePrice` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `totalPrice` INTEGER NOT NULL,

    INDEX `fk_produto_has_request_produto_idx`(`produto_id`),
    INDEX `fk_produto_has_request_request1_idx`(`request_id`),
    PRIMARY KEY (`produto_id`, `request_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `inTransit` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `description` VARCHAR(200) NULL,

    UNIQUE INDEX `produto_id_key`(`id`),
    INDEX `fk_produto_category1_idx`(`category_id`),
    PRIMARY KEY (`id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalPrice` INTEGER NOT NULL,
    `clientName` INTEGER NOT NULL,
    `clients_id` INTEGER NOT NULL,
    `paymentType_id` INTEGER NOT NULL,
    `paymentType_rate_id` INTEGER NOT NULL,
    `paymentType_rate_payment processor_id` INTEGER NOT NULL,
    `salesperson_id` INTEGER NOT NULL,

    UNIQUE INDEX `purchase_id_key`(`id`),
    INDEX `fk_purchase_clients1_idx`(`clients_id`),
    INDEX `fk_purchase_paymentType1_idx`(`paymentType_id`, `paymentType_rate_id`, `paymentType_rate_payment processor_id`),
    INDEX `fk_purchase_salesperson1_idx`(`salesperson_id`),
    PRIMARY KEY (`id`, `clients_id`, `paymentType_id`, `paymentType_rate_id`, `paymentType_rate_payment processor_id`, `salesperson_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `porcent` VARCHAR(45) NOT NULL,
    `payment processor_id` INTEGER NOT NULL,

    INDEX `fk_rate_payment processor1_idx`(`payment processor_id`),
    PRIMARY KEY (`id`, `payment processor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `account` VARCHAR(45) NOT NULL,
    `idTracking` VARCHAR(45) NOT NULL,
    `qtd_items` INTEGER NOT NULL,
    `statusTracking` VARCHAR(15) NOT NULL,
    `accounts_id` INTEGER NOT NULL,
    `accounts_platform_id` INTEGER NOT NULL,
    `lote` INTEGER NOT NULL,

    UNIQUE INDEX `request_id_key`(`id`),
    INDEX `fk_request_accounts1_idx`(`accounts_id`, `accounts_platform_id`),
    PRIMARY KEY (`id`, `accounts_id`, `accounts_platform_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salesperson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `cpf` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `fk_accounts_platform1` FOREIGN KEY (`platform_id`) REFERENCES `platform`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `paymentType` ADD CONSTRAINT `fk_paymentType_rate1` FOREIGN KEY (`rate_id`, `rate_payment processor_id`) REFERENCES `rate`(`id`, `payment processor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prodPurchase` ADD CONSTRAINT `fk_purchase_has_produto_produto1` FOREIGN KEY (`produto_id`) REFERENCES `produto`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prodPurchase` ADD CONSTRAINT `fk_purchase_has_produto_purchase1` FOREIGN KEY (`purchase_id`) REFERENCES `purchase`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prodRequest` ADD CONSTRAINT `fk_produto_has_request_produto` FOREIGN KEY (`produto_id`) REFERENCES `produto`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prodRequest` ADD CONSTRAINT `fk_produto_has_request_request1` FOREIGN KEY (`request_id`) REFERENCES `request`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `fk_produto_category1` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `purchase` ADD CONSTRAINT `fk_purchase_clients1` FOREIGN KEY (`clients_id`) REFERENCES `clients`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `purchase` ADD CONSTRAINT `fk_purchase_paymentType1` FOREIGN KEY (`paymentType_id`, `paymentType_rate_id`, `paymentType_rate_payment processor_id`) REFERENCES `paymentType`(`id`, `rate_id`, `rate_payment processor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `purchase` ADD CONSTRAINT `fk_purchase_salesperson1` FOREIGN KEY (`salesperson_id`) REFERENCES `salesperson`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rate` ADD CONSTRAINT `fk_rate_payment processor1` FOREIGN KEY (`payment processor_id`) REFERENCES `payment processor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `request` ADD CONSTRAINT `fk_request_accounts1` FOREIGN KEY (`accounts_id`, `accounts_platform_id`) REFERENCES `accounts`(`id`, `platform_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
