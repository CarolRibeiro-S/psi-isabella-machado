import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL não está definida. Configure-a em .env.local antes de rodar `npm run db:init`."
  );
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const schemaPath = path.join(__dirname, "..", "db", "schema.sql");
const schema = readFileSync(schemaPath, "utf8");

const statements = schema
  .split(";")
  .map((statement) => statement.trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql(statement);
}

console.log("Banco de dados inicializado com sucesso: tabela 'articles' pronta.");
