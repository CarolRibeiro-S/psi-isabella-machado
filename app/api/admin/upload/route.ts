import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdminSessionValid } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const isValid = await isAdminSessionValid();

  if (!isValid) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Upload de imagem não configurado neste ambiente. Cole a URL da imagem manualmente ou configure o Vercel Blob (BLOB_READ_WRITE_TOKEN).",
      },
      { status: 501 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Envie apenas arquivos de imagem." }, { status: 400 });
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "A imagem deve ter no máximo 8MB." }, { status: 400 });
  }

  const blob = await put(`artigos/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url });
}
