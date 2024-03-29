-- CreateTable
CREATE TABLE "Jet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "wingspan" DECIMAL NOT NULL,
    "engines" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
