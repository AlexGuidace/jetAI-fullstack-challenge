-- CreateTable
CREATE TABLE "Jet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "wingspan" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "topSpeed" TEXT NOT NULL,
    "fuelEfficiency" TEXT NOT NULL,
    "maxSeats" TEXT NOT NULL,
    "isSelected" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
