-- Additive nullable column: existing rows get NULL, no data lost.
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "videoUrl" TEXT;
