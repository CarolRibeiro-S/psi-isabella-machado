-- Schema do banco de dados (Neon / Postgres)
-- Execute este script uma vez para preparar o banco (ou use `npm run db:init`).

CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS articles_published_at_idx ON articles (published_at DESC);
CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles (slug);
