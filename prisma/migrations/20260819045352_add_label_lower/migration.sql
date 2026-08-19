PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "labelLower" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

INSERT INTO "new_Tag" ("id", "label", "labelLower", "position", "createdAt", "updatedAt")
SELECT "id", "label", lower("label"), "position", "createdAt", "updatedAt" FROM "Tag";

DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";

CREATE UNIQUE INDEX "Tag_labelLower_key" ON "Tag"("labelLower");

PRAGMA foreign_keys=ON;
