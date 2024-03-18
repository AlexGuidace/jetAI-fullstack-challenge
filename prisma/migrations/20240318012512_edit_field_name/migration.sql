/*
  Warnings:

  - You are about to drop the column `engine` on the `Jet` table. All the data in the column will be lost.
  - Added the required column `engines` to the `Jet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Jet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "wingspan" TEXT NOT NULL,
    "engines" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Jet" ("createdAt", "id", "name", "wingspan", "year") SELECT "createdAt", "id", "name", "wingspan", "year" FROM "Jet";
DROP TABLE "Jet";
ALTER TABLE "new_Jet" RENAME TO "Jet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
