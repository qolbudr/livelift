-- CreateTable
CREATE TABLE `Packages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `max_stream` INTEGER NOT NULL,
    `max_quality` INTEGER NOT NULL,
    `video_looping` BOOLEAN NOT NULL,
    `watermark` BOOLEAN NOT NULL,
    `custom_logo` BOOLEAN NOT NULL,
    `scheduling` BOOLEAN NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `packageId` INTEGER NOT NULL,
    `tenant` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Packages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
