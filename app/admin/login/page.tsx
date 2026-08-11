import type { Metadata } from "next";
import ButterflyIcon from "@/components/ButterflyIcon";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Login | Painel administrativo",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-soft-radial px-5 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-cocoa/10 bg-linen/90 p-8 shadow-soft">
        <div className="mb-6 flex flex-col items-center text-center">
          <ButterflyIcon className="mb-3 h-9 w-9 text-cocoa" />
          <h1 className="font-serif text-2xl text-espresso">Painel administrativo</h1>
          <p className="mt-1 font-sans text-sm text-truffle">
            Acesso restrito para gerenciar os artigos do site.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
