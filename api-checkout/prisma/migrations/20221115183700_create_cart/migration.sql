-- CreateTable
CREATE TABLE "Cart" (
    "cartId" TEXT NOT NULL,
    "amountItems" INTEGER NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "clientId" UUID NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cartId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_cartId_key" ON "Cart"("cartId");
