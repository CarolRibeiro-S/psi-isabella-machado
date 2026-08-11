"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ButterflyIcon from "@/components/ButterflyIcon";
import { logoutAction } from "@/app/admin/login/actions";
import { SITE } from "@/lib/site";

const ADMIN_NAV_LINKS = [{ href: "/admin", label: "Artigos" }];

function isNavLinkActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function AdminProfile() {
  return (
    <div className="mb-6 flex items-center gap-3 px-3">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-cocoa/15">
        <Image
          src="/images/foto_isabella.jpeg"
          alt="Isabella Machado"
          fill
          className="object-cover object-[50%_15%]"
          sizes="44px"
        />
      </div>
      <div className="min-w-0">
        <p className="truncate font-serif text-base text-espresso">Olá, Isabella</p>
        <p className="font-sans text-xs text-truffle">Painel administrativo</p>
      </div>
    </div>
  );
}

function SidebarNav({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {ADMIN_NAV_LINKS.map((link) => {
        const active = isNavLinkActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`rounded-xl px-3 py-2.5 font-sans text-sm transition-colors ${
              active
                ? "bg-cocoa text-linen"
                : "text-truffle hover:bg-camel/15 hover:text-cocoa"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linen">
      <header className="border-b border-cocoa/10 bg-porcelain">
        <div className="flex items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Abrir menu"
              className="flex items-center justify-center rounded-full p-1.5 text-espresso lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <Link href="/admin" className="flex items-center gap-2.5">
              <ButterflyIcon className="h-6 w-6 text-cocoa" />
              <span className="hidden font-serif text-lg text-espresso sm:inline">
                {SITE.shortName}
              </span>
            </Link>
          </div>

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

      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 overflow-hidden border-r border-cocoa/10 bg-porcelain/60 px-4 py-8 lg:block">
          <ButterflyIcon className="pointer-events-none absolute -bottom-12 -left-14 h-80 w-80 text-cocoa/[0.06]" />
          <div className="relative">
            <AdminProfile />
            <SidebarNav pathname={pathname} />
          </div>
        </aside>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setMobileNavOpen(false)}
              className="absolute inset-0 bg-espresso/40"
            />
            <aside className="absolute left-0 top-0 h-full w-64 bg-linen px-4 py-6 shadow-soft">
              <div className="mb-2 flex items-center justify-between px-1">
                <ButterflyIcon className="h-6 w-6 text-cocoa" />
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Fechar menu"
                  className="flex items-center justify-center rounded-full p-1.5 text-espresso"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6l-12 12" />
                  </svg>
                </button>
              </div>
              <AdminProfile />
              <SidebarNav pathname={pathname} onNavigate={() => setMobileNavOpen(false)} />
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 px-5 py-10 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
