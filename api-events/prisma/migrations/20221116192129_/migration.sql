-- CreateTable
CREATE TABLE "Organizer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fantasyName" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "eventId" TEXT NOT NULL,
    "eventTitle" TEXT NOT NULL,
    "eventDescription" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventContact" TEXT NOT NULL,
    "eventInstagram" TEXT NOT NULL,
    "eventFacebook" TEXT NOT NULL,
    "activeEvent" BOOLEAN NOT NULL,
    "eventStreet" TEXT NOT NULL,
    "eventAddressNumber" TEXT NOT NULL,
    "eventCity" TEXT NOT NULL,
    "eventState" TEXT NOT NULL,
    "organizerId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketId" TEXT NOT NULL,
    "ticketPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "ticketRate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "ticketEventBatch" INTEGER NOT NULL DEFAULT 1,
    "ticketAmountAvailable" INTEGER NOT NULL DEFAULT 0,
    "relatedEventId" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "Cart" (
    "cartId" TEXT NOT NULL,
    "amountItems" INTEGER NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "clientId" TEXT NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cartId")
);

-- CreateTable
CREATE TABLE "CartItems" (
    "itemCartId" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "expiredDate" TIMESTAMP(3),

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("itemCartId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_id_key" ON "Organizer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_email_key" ON "Organizer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_fantasyName_key" ON "Organizer"("fantasyName");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_cnpj_key" ON "Organizer"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventId_key" ON "Event"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventTitle_key" ON "Event"("eventTitle");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticketId_key" ON "Ticket"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_cartId_key" ON "Cart"("cartId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItems_itemCartId_key" ON "CartItems"("itemCartId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_relatedEventId_fkey" FOREIGN KEY ("relatedEventId") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;
