/*
  Warnings:

  - You are about to drop the column `cpf` on the `accounts` table. All the data in the column will be lost.
  - The primary key for the `paymentType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rate_payment processor_id` on the `paymentType` table. All the data in the column will be lost.
  - You are about to alter the column `installments` on the `paymentType` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Int`.
  - The primary key for the `rate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `payment processor_id` on the `rate` table. All the data in the column will be lost.
  - You are about to alter the column `porcent` on the `rate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Int`.
  - You are about to drop the column `account` on the `request` table. All the data in the column will be lost.
  - You are about to drop the `payment processor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `owner` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate_payment_processor_id` to the `paymentType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installments` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_processor_id` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeName` to the `request` table without a default value. This is not possible if the table is not empty.
  - Made the column `cpf` on table `salesperson` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `paymentType` DROP FOREIGN KEY `fk_paymentType_rate1`;

-- DropForeignKey
ALTER TABLE `prodPurchase` DROP FOREIGN KEY `fk_purchase_has_produto_produto1`;

-- DropForeignKey
ALTER TABLE `prodRequest` DROP FOREIGN KEY `fk_produto_has_request_produto`;

-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `fk_produto_category1`;

-- DropForeignKey
ALTER TABLE `purchase` DROP FOREIGN KEY `fk_purchase_paymentType1`;

-- DropForeignKey
ALTER TABLE `rate` DROP FOREIGN KEY `fk_rate_payment processor1`;

-- AlterTable
ALTER TABLE `accounts` DROP COLUMN `cpf`,
    ADD COLUMN `owner` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `paymentType` DROP PRIMARY KEY,
    DROP COLUMN `rate_payment processor_id`,
    ADD COLUMN `rate_payment_processor_id` INTEGER NOT NULL,
    MODIFY `installments` INTEGER NULL,
    ADD PRIMARY KEY (`id`, `rate_id`, `rate_payment_processor_id`);

-- AlterTable
ALTER TABLE `rate` DROP PRIMARY KEY,
    DROP COLUMN `payment processor_id`,
    ADD COLUMN `installments` INTEGER NOT NULL,
    ADD COLUMN `payment_processor_id` INTEGER NOT NULL,
    MODIFY `porcent` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`, `payment_processor_id`);

-- AlterTable
ALTER TABLE `request` DROP COLUMN `account`,
    ADD COLUMN `storeName` VARCHAR(45) NOT NULL,
    MODIFY `lote` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `salesperson` MODIFY `cpf` VARCHAR(45) NOT NULL;

-- DropTable
DROP TABLE `payment processor`;

-- DropTable
DROP TABLE `produto`;

-- CreateTable
CREATE TABLE `paymentProcessor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
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

-- CreateIndex
CREATE INDEX `fk_paymentType_rate1_idx` ON `paymentType`(`rate_id`, `rate_payment_processor_id`);

-- CreateIndex
CREATE INDEX `fk_rate_payment processor1_idx` ON `rate`(`payment_processor_id`);

-- AddForeignKey
ALTER TABLE `paymentType` ADD CONSTRAINT `fk_paymentType_rate1` FOREIGN KEY (`rate_id`, `rate_payment_processor_id`) REFERENCES `rate`(`id`, `payment_processor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prodPurchase` ADD CONSTRAINT `fk_purchase_has_produto_produto1` FOREIGN KEY (`produto_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prodRequest` ADD CONSTRAINT `fk_produto_has_request_produto` FOREIGN KEY (`produto_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `purchase` ADD CONSTRAINT `fk_purchase_paymentType1` FOREIGN KEY (`paymentType_id`, `paymentType_rate_id`, `paymentType_rate_payment processor_id`) REFERENCES `paymentType`(`id`, `rate_id`, `rate_payment_processor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rate` ADD CONSTRAINT `fk_rate_payment processor1` FOREIGN KEY (`payment_processor_id`) REFERENCES `paymentProcessor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `fk_produto_category1` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
