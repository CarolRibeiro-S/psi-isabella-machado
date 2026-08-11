"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

/**
 * Deve ficar dentro de um <form action={...}>. Quando a Server Action
 * termina (pending passa de true para false), força um router.refresh().
 * Necessário porque o Next.js às vezes não atualiza a UI da rota atual
 * automaticamente quando a action redireciona para a mesma rota onde já
 * está (ex: /admin -> /admin), mesmo com revalidatePath chamado no servidor.
 */
export default function RefreshOnComplete() {
  const { pending } = useFormStatus();
  const wasPending = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (wasPending.current && !pending) {
      router.refresh();
    }
    wasPending.current = pending;
  }, [pending, router]);

  return null;
}
