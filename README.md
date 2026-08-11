# Site — Isabella Cristina Ribeiro Machado (Psicóloga Clínica)

Site institucional + blog de artigos, construído com Next.js (App Router) e
Neon (Postgres). Isabella publica e edita os artigos sozinha pelo painel
`/admin`, sem precisar mexer em código.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** com paleta neutra personalizada
- **Neon (Postgres)** via `@neondatabase/serverless`
- **Vercel Blob** (opcional) para upload de imagem de capa
- Sessão de admin assinada com **jose** (JWT) + **bcryptjs**
- Deploy pensado para **Vercel**

## Como rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha as variáveis (veja abaixo)
npm run db:init              # cria a tabela "articles" no Neon
npm run dev
```

Acesse `http://localhost:3000` para o site e `http://localhost:3000/admin`
para o painel administrativo.

## Variáveis de ambiente

Veja `.env.example` para a lista completa. Resumo:

| Variável | Para que serve |
|---|---|
| `DATABASE_URL` | Connection string do Neon (Postgres) |
| `SESSION_SECRET` | Chave para assinar a sessão de login do admin |
| `ADMIN_EMAIL` | E-mail de login da Isabella no `/admin` |
| `ADMIN_PASSWORD_HASH` | Hash bcrypt da senha (gerar com `npm run hash-password -- "senha"`) |
| `BLOB_READ_WRITE_TOKEN` | Opcional — permite upload de imagem de capa direto do computador |

### Gerando a senha do painel admin

```bash
npm run hash-password -- "a-senha-que-a-isabella-vai-usar"
```

O comando imprime duas versões do hash: uma com os `$` escapados (`\$`), para
colar no `.env.local`, e outra sem escapar, para colar no dashboard de
variáveis de ambiente da Vercel. Use a versão certa para cada lugar: o
carregador de `.env` do Next.js interpreta `$` como início de variável, então
colar o hash bcrypt (que é cheio de `$`) sem escapar no `.env.local` corrompe
o valor silenciosamente e o login para de funcionar sem erro visível.

## Banco de dados (Neon)

1. Crie um projeto em [neon.tech](https://neon.tech) (tem plano gratuito).
2. Copie a "pooled connection string" e coloque em `DATABASE_URL`.
3. Rode `npm run db:init` para criar a tabela `articles` (schema em
   [db/schema.sql](db/schema.sql)).

A tabela `articles` guarda: `id`, `title`, `slug`, `content`,
`cover_image_url`, `published_at`, `created_at`, `updated_at`. Um artigo só
aparece no site público quando `published_at` está preenchido — isso é o que
permite salvar rascunhos no painel antes de publicar.

## Domínio do site

O arquivo [lib/site.ts](lib/site.ts) usa `https://psiisabellamachado.com.br`
como URL provisória (usada no SEO, Open Graph e `sitemap.xml`). Assim que o
domínio definitivo for definido, atualize o campo `url` nesse arquivo.

## Deploy na Vercel

1. Suba este projeto num repositório Git e importe-o na
   [Vercel](https://vercel.com/new).
2. Em **Settings → Environment Variables**, adicione as mesmas variáveis do
   `.env.local` (`DATABASE_URL`, `SESSION_SECRET`, `ADMIN_EMAIL`,
   `ADMIN_PASSWORD_HASH`).
3. (Opcional) Em **Storage**, crie um **Blob Store** e conecte ao projeto —
   isso preenche `BLOB_READ_WRITE_TOKEN` automaticamente e habilita o upload
   de imagem de capa direto do computador no painel admin.
4. Faça o deploy. Depois do primeiro deploy, rode `npm run db:init` (com o
   `DATABASE_URL` de produção) uma única vez para criar a tabela no banco,
   caso ainda não tenha feito isso localmente apontando para o mesmo banco.

## Painel administrativo

- `/admin/login` — login da Isabella (e-mail + senha).
- `/admin` — lista de artigos, com status (Rascunho/Publicado), publicar,
  despublicar, editar e excluir.
- `/admin/articles/new` — criar um artigo novo.
- `/admin/articles/[id]/edit` — editar um artigo existente.

No campo "Conteúdo", o formato é simples de propósito (pensado para quem não
programa): uma linha em branco separa parágrafos, `**palavra**` vira negrito
e `*palavra*` vira itálico.

## Foto da Isabella

O Hero usa a foto profissional em
[public/images/foto_isabella.jpeg](public/images/foto_isabella.jpeg). Para
trocar por uma foto nova, substitua esse arquivo (mesmo nome) ou salve o novo
arquivo em `public/images/` e ajuste o `src` da tag `<Image>` em
[components/Hero.tsx](components/Hero.tsx).

## Identidade visual

- **Cores** — definidas em [tailwind.config.ts](tailwind.config.ts):
  `linen`, `porcelain`, `khaki`, `oat`, `camel`, `blush`, `taupe`, `cocoa`,
  `mocha`, `espresso`, `truffle`.
- **Tipografia** — títulos em serifada (Fraunces), texto corrido em sans
  (Work Sans), configuradas em [app/fonts.ts](app/fonts.ts).
- **Borboleta** — line art minimalista em
  [components/ButterflyIcon.tsx](components/ButterflyIcon.tsx), usada no
  cabeçalho, favicon, hero, rodapé e placeholder de artigos sem capa.

## Estrutura de pastas

```
app/
  page.tsx                 → Home (Hero, Sobre, Áreas de atuação, Artigos, Contato)
  artigos/page.tsx          → Lista de artigos publicados
  artigos/[slug]/page.tsx   → Página de um artigo
  admin/                    → Painel administrativo (protegido)
  api/admin/upload/         → Upload de imagem de capa (Vercel Blob)
components/                 → Componentes de UI (públicos e admin/)
lib/                        → Conexão com o banco, autenticação, helpers
db/schema.sql                → Schema da tabela articles
scripts/                    → Scripts utilitários (init do banco, hash de senha)
```

---

Site criado e desenvolvido por [Carol Ribeiro](https://carolribeiros.com.br).
