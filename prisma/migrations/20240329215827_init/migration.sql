-- CreateTable
CREATE TABLE "Jet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wingspan" DECIMAL(65,30) NOT NULL,
    "engines" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jet_pkey" PRIMARY KEY ("id")
);
