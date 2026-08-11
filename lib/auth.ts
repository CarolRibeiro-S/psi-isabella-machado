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
