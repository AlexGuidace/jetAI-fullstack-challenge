/*
  Warnings:

  - You are about to alter the column `wingspan` on the `Jet` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Jet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "wingspan" INTEGER NOT NULL,
    "engines" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Jet" ("createdAt", "engines", "id", "name", "wingspan", "year") SELECT "createdAt", "engines", "id", "name", "wingspan", "year" FROM "Jet";
DROP TABLE "Jet";
ALTER TABLE "new_Jet" RENAME TO "Jet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
