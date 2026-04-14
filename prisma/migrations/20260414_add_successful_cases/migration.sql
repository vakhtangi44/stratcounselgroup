-- CreateTable
CREATE TABLE IF NOT EXISTS "SuccessfulCase" (
    "id" SERIAL NOT NULL,
    "textKa" TEXT NOT NULL,
    "textEn" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'scale',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SuccessfulCase_pkey" PRIMARY KEY ("id")
);
