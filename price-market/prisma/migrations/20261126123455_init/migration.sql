-- CreateTable
CREATE TABLE `Metal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `symbol` VARCHAR(10) NOT NULL,
    `slug` VARCHAR(50) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Metal_name_key`(`name`),
    UNIQUE INDEX `Metal_symbol_key`(`symbol`),
    UNIQUE INDEX `Metal_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetalPrice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `metalId` INTEGER NOT NULL,
    `price` DECIMAL(18, 4) NOT NULL,
    `currency` VARCHAR(3) NOT NULL DEFAULT 'INR',
    `unit` VARCHAR(20) NOT NULL,
    `source` VARCHAR(30) NOT NULL,
    `benchmark` VARCHAR(80) NOT NULL,
    `benchmarkDate` DATE NOT NULL,
    `fetchedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `MetalPrice_metalId_benchmarkDate_idx`(`metalId`, `benchmarkDate`),
    UNIQUE INDEX `MetalPrice_metalId_source_benchmark_unit_benchmarkDate_key`(`metalId`, `source`, `benchmark`, `unit`, `benchmarkDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MetalPrice` ADD CONSTRAINT `MetalPrice_metalId_fkey` FOREIGN KEY (`metalId`) REFERENCES `Metal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
