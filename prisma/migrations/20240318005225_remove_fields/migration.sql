/*
  Warnings:

  - You are about to drop the column `fuelEfficiency` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `isSelected` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `maxSeats` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `topSpeed` on the `Jet` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Jet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "wingspan" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Jet" ("createdAt", "engine", "id", "name", "wingspan", "year") SELECT "createdAt", "engine", "id", "name", "wingspan", "year" FROM "Jet";
DROP TABLE "Jet";
ALTER TABLE "new_Jet" RENAME TO "Jet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
