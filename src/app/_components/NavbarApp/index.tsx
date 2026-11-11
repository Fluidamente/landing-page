"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/site";

const links = [
  { href: "/#que-te-trae", label: "¿Qué te trae?" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/ebook", label: "Ebook" },
  { href: "/#contacto", label: "Contacto" },
];

export default function NavbarApp() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-deep text-white">
      <nav
        aria-label="Principal"
        className="wrap flex h-[64px] items-center justify-between gap-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[1.25rem] font-extrabold tracking-[-0.04em]"
        >
          <Image
            src="/images/isotipo.png"
            width={36}
            height={33}
            alt=""
            priority
          />
          fluidamente
        </Link>

        <ul className="hidden items-center gap-7 font-semibold lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className="nav-link"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-aqua hidden min-h-[44px] px-5 sm:inline-flex"
          >
            Agendar sesión
          </a>
          <button
            type="button"
            className="btn min-h-[44px] px-5 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </nav>

      <div
        id="menu-movil"
        className={`mobile-menu wrap lg:hidden ${open ? "is-open" : ""}`}
        hidden={!open}
      >
        <ul className="flex flex-col gap-1 pb-6 pt-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2.5 text-lead font-semibold"
              >
                <span className="knob-dot text-aqua" aria-hidden />
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-3 sm:hidden">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-aqua w-full"
            >
              Agendar sesión
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
