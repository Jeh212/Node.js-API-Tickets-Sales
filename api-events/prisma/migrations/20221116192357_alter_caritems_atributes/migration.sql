/*
  Warnings:

  - You are about to drop the column `cartId` on the `CartItems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartItems" DROP COLUMN "cartId",
ADD COLUMN     "cartCartId" TEXT;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_cartCartId_fkey" FOREIGN KEY ("cartCartId") REFERENCES "Cart"("cartId") ON DELETE SET NULL ON UPDATE CASCADE;
