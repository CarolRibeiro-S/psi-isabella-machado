import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Uso: npm run hash-password -- "sua-senha-aqui"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
const hashEscapedForDotenv = hash.replace(/\$/g, "\\$");

console.log(
  "\nO hash bcrypt começa com $2a$12$ e contém vários outros $. O carregador de .env do Next.js (dotenv-expand) trata $ como início de uma variável, então colar o hash sem escapar corrompe o valor silenciosamente."
);

console.log("\n1) Para o arquivo .env.local, cole a linha ABAIXO (com \\$ no lugar de $):\n");
console.log(`ADMIN_PASSWORD_HASH=${hashEscapedForDotenv}\n`);

console.log(
  "2) Para as variáveis de ambiente da Vercel (campo de valor no dashboard, sem parsing de .env), cole o hash SEM escapar:\n"
);
console.log(`${hash}\n`);
