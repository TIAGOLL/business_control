-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `platform` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `salesperson_id` INTEGER NOT NULL,
    `payment_type_id` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `status` VARCHAR(45) NOT NULL,

    INDEX `fk_purchase_clients1_idx`(`client_id`),
    INDEX `fk_purchase_salesperson1_idx`(`salesperson_id`),
    INDEX `fk_purchase_payment_type1_idx`(`payment_type_id`),
    PRIMARY KEY (`id`, `client_id`, `salesperson_id`, `payment_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `status_tracking_id` INTEGER NOT NULL,
    `lot` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `store_name` VARCHAR(45) NOT NULL,
    `tracking_id` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `request_id_key`(`id`),
    UNIQUE INDEX `lote_UNIQUE`(`lot`),
    INDEX `fk_request_account1_idx`(`account_id`),
    INDEX `fk_request_status_tracking1_idx`(`status_tracking_id`),
    PRIMARY KEY (`id`, `account_id`, `status_tracking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salesperson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `cpf` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `sale_price` FLOAT NOT NULL,
    `profit_porcent` INTEGER NOT NULL,
    `description` VARCHAR(200) NULL,

    UNIQUE INDEX `product_id_key`(`id`),
    INDEX `fk_produto_category1_idx`(`category_id`),
    PRIMARY KEY (`id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `platform_id` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `owner` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_account_platform1_idx`(`platform_id`),
    PRIMARY KEY (`id`, `platform_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `cpf` VARCHAR(45) NULL,
    `adress` VARCHAR(45) NULL,
    `place_work` VARCHAR(45) NULL,
    `description` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `porcent_rate` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prod_purchase` (
    `purchase_id` INTEGER NOT NULL,
    `purchase_clients_id` INTEGER NOT NULL,
    `purchase_salesperson_id` INTEGER NOT NULL,
    `purchase_payment_type_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `product_category_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total_profit` FLOAT NOT NULL,

    INDEX `fk_purchase_has_product_product1_idx`(`product_id`, `product_category_id`),
    INDEX `fk_purchase_has_product_purchase1_idx`(`purchase_id`, `purchase_clients_id`, `purchase_salesperson_id`, `purchase_payment_type_id`),
    PRIMARY KEY (`purchase_id`, `purchase_clients_id`, `purchase_salesperson_id`, `purchase_payment_type_id`, `product_id`, `product_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status_tracking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prod_request` (
    `request_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `purchase_price` FLOAT NOT NULL,

    INDEX `fk_request_has_product_product2_idx`(`product_id`),
    INDEX `fk_request_has_product_request2_idx`(`request_id`),
    PRIMARY KEY (`request_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
