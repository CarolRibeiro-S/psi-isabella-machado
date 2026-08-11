import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL não está configurada. Defina a connection string do Neon em .env.local (veja .env.example)."
  );
}

// O driver HTTP do Neon usa fetch() por baixo dos panos. Sem isso, o Next.js
// intercepta esse fetch e guarda a resposta no Data Cache, então uma página
// pode continuar mostrando dados antigos do banco mesmo depois de um INSERT/
// UPDATE/DELETE, mesmo em rotas marcadas como force-dynamic.
export const sql = neon(process.env.DATABASE_URL, {
  fetchOptions: { cache: "no-store" },
});
