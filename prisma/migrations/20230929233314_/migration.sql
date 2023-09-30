-- CreateTable
CREATE TABLE `teste` (
    `id` INTEGER NOT NULL,
    `nome` VARCHAR(45) NULL,
    `preco_venda` INTEGER NOT NULL,
    `qtd` INTEGER NOT NULL,
    `preco_compra` INTEGER NOT NULL,
    `porcent_lucro` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
