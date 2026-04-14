-- CreateTable
CREATE TABLE IF NOT EXISTS "AboutValue" (
    "id" SERIAL NOT NULL,
    "titleKa" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionKa" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'scales',
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AboutValue_pkey" PRIMARY KEY ("id")
);
