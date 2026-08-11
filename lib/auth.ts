import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = "isabella_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 dias

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET não está configurada. Defina uma string aleatória longa em .env.local (veja .env.example)."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(subject: string): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(subject)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export const SESSION_MAX_AGE = SESSION_DURATION_SECONDS;

/**
 * Checa a sessão via cookies() (Server Components/Actions), em vez de
 * middleware. O Next.js 14 tem um bug conhecido de interação entre
 * middleware e Server Actions: quando uma Server Action é chamada a partir
 * de uma rota protegida por middleware, a resposta da action pode vir com
 * x-action-redirect apontando para o destino de "não autenticado" do
 * middleware, mesmo com um cookie de sessão válido presente na requisição.
 * Checar a sessão diretamente com cookies() dentro do layout e de cada
 * action evita esse problema.
 */
export async function isAdminSessionValid(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return token ? verifySessionToken(token) : false;
}
