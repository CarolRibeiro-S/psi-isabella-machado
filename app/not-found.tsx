import Link from "next/link";
import ButterflyIcon from "@/components/ButterflyIcon";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center px-5 py-28 text-center">
      <ButterflyIcon className="h-12 w-12 text-camel" />
      <h1 className="mt-6 font-serif text-3xl text-espresso">Página não encontrada</h1>
      <p className="mt-3 max-w-sm font-sans text-base text-truffle">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Voltar para o início
      </Link>
    </main>
  );
}
