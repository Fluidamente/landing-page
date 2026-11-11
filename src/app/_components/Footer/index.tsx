import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from "@/lib/site";

const nav = [
  { href: "/#que-te-trae", label: "¿Qué te trae?" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#testimonios", label: "Testimonios" },
  { href: "/ebook", label: "Ebook" },
  { href: "/cursos", label: "Cursos" },
];

const Footer = () => {
  return (
    <footer className="wrap bg-deep pb-10 pt-20 text-white md:pt-28">
      <div aria-hidden className="flex items-end gap-[2vw]" data-reveal>
        <Image
          src="/images/isotipo.png"
          width={260}
          height={235}
          alt=""
          className="h-auto w-[13vw] max-w-[220px]"
        />
        <p className="display -mb-[0.06em] text-[min(11.5vw,12rem)]">
          fluidamente
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12">
        <nav aria-label="Pie" className="md:col-span-4">
          <h2 className="text-lead font-extrabold">El sitio</h2>
          <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="link decoration-transparent hover:decoration-current"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4 md:col-start-6">
          <h2 className="text-lead font-extrabold">Escribime</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Instagram {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-2 flex items-start md:col-span-3 md:col-start-10 md:justify-end">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-aqua"
          >
            Agendar una sesión
          </a>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 text-small">
        <p>© {new Date().getFullYear()} Fluidamente · Lic. Sergio Lépori</p>
        <a
          href="https://yaguaretech.net"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          Sitio creado por
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/yaguaretech.svg"
            alt="Yaguaretech"
            className="h-7 w-auto"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
