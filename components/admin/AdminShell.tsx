import Link from "next/link";
import ButterflyIcon from "@/components/ButterflyIcon";
import { logoutAction } from "@/app/admin/login/actions";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linen">
      <header className="border-b border-cocoa/10 bg-porcelain">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/admin" className="flex items-center gap-2.5">
            <ButterflyIcon className="h-6 w-6 text-cocoa" />
            <span className="font-serif text-lg text-espresso">Painel administrativo</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="font-sans text-sm text-truffle hover:text-cocoa">
              Ver site
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="font-sans text-sm text-truffle hover:text-cocoa">
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">{children}</main>
    </div>
  );
}
