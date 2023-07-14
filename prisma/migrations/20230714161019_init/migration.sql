-- DropForeignKey
ALTER TABLE `interaction` DROP FOREIGN KEY `Interaction_productId_fkey`;

-- DropForeignKey
ALTER TABLE `interaction` DROP FOREIGN KEY `Interaction_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `passport` DROP FOREIGN KEY `Passport_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_depositId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_passportId_fkey`;

-- AlterTable
ALTER TABLE `interaction` MODIFY `roleId` INTEGER NULL,
    MODIFY `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `passport` MODIFY `brandId` INTEGER NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `passportId` INTEGER NULL,
    MODIFY `depositId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_passportId_fkey` FOREIGN KEY (`passportId`) REFERENCES `Passport`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_depositId_fkey` FOREIGN KEY (`depositId`) REFERENCES `Deposit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interaction` ADD CONSTRAINT `Interaction_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interaction` ADD CONSTRAINT `Interaction_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passport` ADD CONSTRAINT `Passport_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
