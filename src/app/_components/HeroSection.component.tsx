"use client";
import Link from "next/link";
import React, { CSSProperties, useEffect, useRef } from "react";
import { whatsappLink } from "@/lib/site";

// Carpetas apiladas: cada una lleva a su sección y le presta su color.
// De atrás hacia adelante.
const folders = [
  { href: "#ebook", label: "Ebook", bg: "var(--teal)", fg: "#fff", at: "3%" },
  {
    href: "#testimonios",
    label: "Testimonios",
    bg: "var(--sage)",
    fg: "var(--ink)",
    at: "22%",
  },
  {
    href: "#sobre-mi",
    label: "Sobre mí",
    bg: "var(--slate)",
    fg: "#fff",
    at: "41%",
  },
  {
    href: "#servicios",
    label: "Servicios",
    bg: "var(--aqua)",
    fg: "var(--ink)",
    at: "60%",
  },
];

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;
    if (!video) return;
    const sync = () => {
      if (reduce.matches) video.pause();
      else video.play().catch(() => {});
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[calc(100svh-64px)] flex-col overflow-hidden bg-deep text-white"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        poster="/images/hero-puzzle-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source
          src="/videos/hero-puzzle-omni-mobile.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source src="/videos/hero-puzzle-omni-test.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-deep/55" aria-hidden="true" />

      <div className="wrap pt-[clamp(56px,10vh,120px)] text-center">
        <h1 className="display hero-rise">fluidamente</h1>
        <p
          className="hero-rise mx-auto mt-7 max-w-[40ch] text-lead md:mt-9"
          style={{ "--i": 1 } as CSSProperties}
        >
          Terapia psicológica online con el Lic. Sergio Lépori. Sesiones por
          videollamada, estés donde estés.
        </p>
      </div>

      <nav aria-label="Secciones" className="mt-auto pt-20 md:pt-24">
        <ul className="mx-auto w-full px-margin md:w-[86vw] md:px-0">
          {folders.map((f, i) => (
            <li
              key={f.href}
              className="folder folder-stack relative"
              style={{ "--i": i, background: f.bg } as CSSProperties}
            >
              <Link
                href={f.href}
                className="folder-tab tab absolute bottom-full flex h-8 items-center whitespace-nowrap px-5 text-[0.9375rem] font-semibold md:h-10 md:px-7 md:text-[1.125rem]"
                style={
                  {
                    background: f.bg,
                    color: f.fg,
                    "--at": f.at,
                    "--at-m": ["0%", "34%", "62%", "18%"][i],
                  } as CSSProperties
                }
              >
                {f.label}
              </Link>
            </li>
          ))}

          {/* Carpeta abierta: es el comienzo de la sección siguiente */}
          <li
            className="folder relative bg-ground text-ink"
            style={{ "--i": folders.length } as CSSProperties}
          >
            <Link
              href="#que-te-trae"
              className="folder-tab tab absolute bottom-full flex h-8 items-center whitespace-nowrap bg-ground px-5 text-[0.9375rem] font-semibold md:h-10 md:px-7 md:text-[1.125rem]"
              style={{ "--at": "74%", "--at-m": "52%" } as CSSProperties}
            >
              ¿Qué te trae?
            </Link>
            <div className="flex flex-col gap-4 px-5 pb-4 pt-6 sm:flex-row sm:items-center sm:gap-6 md:px-8 md:pt-8">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-teal w-full sm:w-auto"
              >
                Agendar una sesión
              </a>
              <p className="max-w-[44ch] text-body">
                Escribime por WhatsApp y coordinamos el primer encuentro.
              </p>
            </div>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default HeroSection;
