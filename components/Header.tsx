"use client";

import Link from "next/link";
import { useState } from "react";
import ButterflyIcon from "@/components/ButterflyIcon";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cocoa/10 bg-linen/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <ButterflyIcon className="h-9 w-9 text-truffle" bold />
          <span className="font-serif text-lg text-espresso sm:text-xl">
            {SITE.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-truffle transition-colors hover:text-cocoa"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary hidden md:inline-flex"
        >
          Agendar conversa
        </a>

        <button
          type="button"
          className="flex items-center justify-center rounded-full p-2 text-espresso md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6l-12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-cocoa/10 bg-linen px-5 pb-5 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-2.5 font-sans text-base text-truffle hover:bg-porcelain hover:text-cocoa"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-3"
            onClick={() => setOpen(false)}
          >
            Agendar conversa
          </a>
        </nav>
      )}
    </header>
  );
}
