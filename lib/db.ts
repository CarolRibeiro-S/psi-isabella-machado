import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL não está configurada. Defina a connection string do Neon em .env.local (veja .env.example)."
  );
}

export const sql = neon(process.env.DATABASE_URL);
