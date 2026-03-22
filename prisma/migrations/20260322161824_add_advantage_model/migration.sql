-- CreateTable
CREATE TABLE "Advantage" (
    "id" SERIAL NOT NULL,
    "titleKa" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionKa" TEXT,
    "descriptionEn" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Advantage_pkey" PRIMARY KEY ("id")
);
