/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `tokenHash` on the `session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accessTokenHash]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refreshTokenHash]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessExpiresAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessTokenHash` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshExpiresAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshTokenHash` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Session_expiresAt_idx` ON `session`;

-- DropIndex
DROP INDEX `Session_tokenHash_key` ON `session`;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `expiresAt`,
    DROP COLUMN `tokenHash`,
    ADD COLUMN `accessExpiresAt` DATETIME(3) NOT NULL,
    ADD COLUMN `accessTokenHash` VARCHAR(64) NOT NULL,
    ADD COLUMN `refreshExpiresAt` DATETIME(3) NOT NULL,
    ADD COLUMN `refreshTokenHash` VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Session_accessTokenHash_key` ON `Session`(`accessTokenHash`);

-- CreateIndex
CREATE UNIQUE INDEX `Session_refreshTokenHash_key` ON `Session`(`refreshTokenHash`);

-- CreateIndex
CREATE INDEX `Session_refreshExpiresAt_idx` ON `Session`(`refreshExpiresAt`);
