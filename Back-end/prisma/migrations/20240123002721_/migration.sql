-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `platform_id` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `owner` VARCHAR(45) NOT NULL,
    `cpf` VARCHAR(11) NULL,
    `email` VARCHAR(45) NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_account_platform1_idx`(`platform_id`),
    PRIMARY KEY (`id`, `platform_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `cpf` VARCHAR(45) NULL,
    `adress` VARCHAR(45) NULL,
    `place_work` VARCHAR(45) NULL,
    `description` VARCHAR(100) NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',
    `total_purchased` FLOAT NOT NULL DEFAULT 0,
    `entry_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collaborators` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marital_status_id` INTEGER NOT NULL,
    `functions_id` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `entry_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `cpf` VARCHAR(45) NULL,
    `adress` VARCHAR(45) NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',
    `comission` FLOAT NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_collaborators_functions1_idx`(`functions_id`),
    INDEX `fk_salespersons_marital status1_idx`(`marital_status_id`),
    PRIMARY KEY (`id`, `marital_status_id`, `functions_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `discount` FLOAT NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',
    `initial_date` DATE NOT NULL,
    `final_date` DATE NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `functions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `marital_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `moviments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mov_id` INTEGER NOT NULL,
    `date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `type` VARCHAR(45) NOT NULL,
    `author_id` VARCHAR(45) NOT NULL,
    `author_name` VARCHAR(45) NOT NULL,
    `mov_stock` DECIMAL(10, 0) NOT NULL,
    `product_id` INTEGER NOT NULL,
    `product_name` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_moviments_prod_purchases1_idx`(`mov_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_processors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_processor_id` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `porcent_rate` FLOAT NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_payment_type_payment processor1_idx`(`payment_processor_id`),
    PRIMARY KEY (`id`, `payment_processor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `platforms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prod_accessories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `products_id` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_prod_accessories_products1_idx`(`products_id`),
    PRIMARY KEY (`id`, `products_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prod_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prod_functionalities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `products_id` INTEGER NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_prod_functionalities_products1_idx`(`products_id`),
    PRIMARY KEY (`id`, `products_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prod_purchases` (
    `purchase_id` INTEGER NOT NULL,
    `products_id` INTEGER NOT NULL,
    `purchase_price` FLOAT NOT NULL,
    `sale_price` FLOAT NOT NULL,
    `quantity` INTEGER NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    INDEX `fk_prod_purchases_products1_idx`(`products_id`),
    INDEX `fk_purchase_has_product_purchase1_idx`(`purchase_id`),
    PRIMARY KEY (`purchase_id`, `products_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prod_requests` (
    `requests_id` INTEGER NOT NULL,
    `products_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `purchase_price` FLOAT NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',
    `total_purchased` FLOAT NULL,

    INDEX `fk_prod_requests_products1_idx`(`products_id`),
    INDEX `fk_prod_requests_requests1_idx`(`requests_id`),
    PRIMARY KEY (`requests_id`, `products_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `photo_url` VARCHAR(500) NULL,
    `name` VARCHAR(45) NOT NULL,
    `full_name` VARCHAR(100) NULL,
    `sale_price` FLOAT NOT NULL,
    `color` VARCHAR(45) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `critical_stock` BIT(1) NOT NULL DEFAULT b'0',
    `purchase_price` FLOAT NULL DEFAULT 0,
    `profit` FLOAT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_produto_category1_idx`(`category_id`),
    PRIMARY KEY (`id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `payment_type_id` INTEGER NOT NULL,
    `coupon_id` INTEGER NOT NULL DEFAULT 0,
    `collaborators_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `paid` BIT(1) NOT NULL DEFAULT b'0',
    `total_sold` FLOAT NULL,
    `total_profit` FLOAT NULL,
    `total_comission` FLOAT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',
    `final_total_sold` FLOAT NULL,
    `total_coupon_discount` FLOAT NULL,
    `total_invested` FLOAT NULL,
    `total_rate` FLOAT NULL,
    `total_sold_with_coupon` FLOAT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_purchase_clients1_idx`(`client_id`),
    INDEX `fk_purchase_payment_type1_idx`(`payment_type_id`),
    INDEX `fk_purchases_collaborators1_idx`(`collaborators_id`),
    INDEX `fk_purchases_coupon1_idx`(`coupon_id`),
    PRIMARY KEY (`id`, `client_id`, `payment_type_id`, `coupon_id`, `collaborators_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status_tracking_id` INTEGER NOT NULL DEFAULT 2,
    `accounts_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `store_name` VARCHAR(45) NOT NULL,
    `tracking_id` VARCHAR(45) NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_requests_accounts1_idx`(`accounts_id`),
    INDEX `fk_requests_status_tracking1_idx`(`status_tracking_id`),
    PRIMARY KEY (`id`, `status_tracking_id`, `accounts_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status_tracking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `fk_account_platform1` FOREIGN KEY (`platform_id`) REFERENCES `platforms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `collaborators` ADD CONSTRAINT `fk_collaborators_functions1` FOREIGN KEY (`functions_id`) REFERENCES `functions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `collaborators` ADD CONSTRAINT `fk_salespersons_marital status1` FOREIGN KEY (`marital_status_id`) REFERENCES `marital_status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payment_types` ADD CONSTRAINT `fk_payment_type_payment processor1` FOREIGN KEY (`payment_processor_id`) REFERENCES `payment_processors`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prod_accessories` ADD CONSTRAINT `fk_prod_accessories_products1` FOREIGN KEY (`products_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prod_functionalities` ADD CONSTRAINT `fk_prod_functionalities_products1` FOREIGN KEY (`products_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prod_purchases` ADD CONSTRAINT `fk_prod_purchases_products1` FOREIGN KEY (`products_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prod_purchases` ADD CONSTRAINT `fk_prod_purchases_purchases1` FOREIGN KEY (`purchase_id`) REFERENCES `purchases`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prod_requests` ADD CONSTRAINT `fk_prod_requests_products10` FOREIGN KEY (`products_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prod_requests` ADD CONSTRAINT `fk_prod_requests_requests10` FOREIGN KEY (`requests_id`) REFERENCES `requests`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `fk_produto_category1` FOREIGN KEY (`category_id`) REFERENCES `prod_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `fk_purchase_clients1` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `fk_purchase_payment_type1` FOREIGN KEY (`payment_type_id`) REFERENCES `payment_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `fk_purchases_collaborators1` FOREIGN KEY (`collaborators_id`) REFERENCES `collaborators`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `fk_purchases_coupon1` FOREIGN KEY (`coupon_id`) REFERENCES `coupons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `fk_requests_accounts1` FOREIGN KEY (`accounts_id`) REFERENCES `accounts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `fk_requests_status_tracking1` FOREIGN KEY (`status_tracking_id`) REFERENCES `status_tracking`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
