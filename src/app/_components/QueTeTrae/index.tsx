"use client";
import React, { CSSProperties, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { whatsappLink } from "@/lib/site";
import { piecePath } from "@/lib/puzzle";

// Pieza de rompecabezas para la foto: perillas arriba y a la derecha,
// encastres abajo y a la izquierda. Caja 125 × 100 (proporción 5:4).
const BOX_W = 125;
const BOX_H = 100;
const TAB = 23.66; // lo que sobresale una perilla (0.31 del lado corto)
const PIECE_D = piecePath(0, TAB, BOX_W - TAB, BOX_H - TAB, {
  top: 1,
  right: 1,
  bottom: -1,
  left: -1,
});
// Cada tema deja la pieza apenas girada, como recién apoyada
const TILT = [-1.5, 1.2, -0.8, 1.6, -1.1];

type Tema = {
  id: string;
  name: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  extra?: { href: string; label: string };
};

const temas: Tema[] = [
  {
    id: "ansiedad",
    name: "Ansiedad",
    title: "Cuando la cabeza no para",
    text: "Trabajamos sobre lo que la dispara hoy: los pensamientos que se repiten, el cuerpo en alerta, las situaciones que evitás. La idea es que recuperes margen para elegir cómo responder.",
    image: "/images/temas/ansiedad-ai.jpg",
    alt: "Un cisne blanco nada en un lago calmo con niebla, frente a un bosque",
  },
  {
    id: "duelo",
    name: "Duelo",
    title: "Una pérdida que todavía pesa",
    text: "Ponerle nombre al dolor y transitarlo a tu ritmo, sin apurar etapas. Si preferís empezar leyendo, el ebook reúne tareas vivenciales para acompañar el proceso.",
    image: "/images/temas/duelo.jpg",
    alt: "Un sendero de piedra que se pierde en un bosque con niebla",
    extra: { href: "#ebook", label: "Ver el ebook" },
  },
  {
    id: "vinculos",
    name: "Vínculos",
    title: "Cómo te relacionás con los demás y con vos",
    text: "Miramos los patrones que se repiten en la pareja, la familia o el trabajo, y de dónde vienen, para modificar lo que hoy te genera malestar.",
    image: "/images/temas/vinculos.jpg",
    alt: "Pintura de dos mujeres caminando juntas por la orilla del mar al atardecer",
  },
  {
    id: "cambios",
    name: "Cambios en mi vida",
    title: "Otra ciudad, otro trabajo, otra etapa",
    text: "Los cambios grandes mueven todo. Acompaño a quienes están empezando de nuevo, también desde otro país: las sesiones son online.",
    image: "/images/temas/cambios.jpg",
    alt: "Una bandada de aves blancas volando en un cielo azul",
  },
  {
    id: "examenes",
    name: "Exámenes",
    title: "Rendir con la cabeza tranquila",
    text: "Preparamos el terreno antes de la fecha: ordenar el estudio, bajar la autoexigencia y llegar al examen sabiendo qué hacer con los nervios.",
    image: "/images/temas/examenes-ai.jpg",
    alt: "Una mesa de estudio con un cuaderno abierto, libros y un vaso de agua en una biblioteca tranquila",
  },
];

const QueTeTrae: React.FC = () => {
  const [active, setActive] = useState(0);
  const tema = temas[active];

  return (
    <section
      id="que-te-trae"
      aria-labelledby="que-te-trae-title"
      className="wrap bg-ground pb-section pt-16 md:pt-24"
    >
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="que-te-trae-title" className="heading" data-reveal>
            ¿Qué te trae?
          </h2>
          <p
            className="mt-5 max-w-[34ch] text-body"
            data-reveal
            style={{ "--i": 1 } as CSSProperties}
          >
            Elegí lo que estás atravesando y te cuento cómo lo trabajamos en
            sesión.
          </p>

          <ul
            className="temas mt-8 flex flex-wrap gap-x-6 gap-y-1 lg:mt-12 lg:flex-col"
            role="list"
          >
            {temas.map((t, i) => (
              <li
                key={t.id}
                data-reveal
                style={{ "--i": i + 2 } as CSSProperties}
              >
                <button
                  type="button"
                  aria-pressed={i === active}
                  aria-controls="tema-panel"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="tema-btn flex items-center gap-4 whitespace-nowrap py-1 text-[clamp(1.625rem,1rem+2vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.04em]"
                >
                  <span className="knob-dot tema-dot text-teal" aria-hidden />
                  {t.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div
          id="tema-panel"
          aria-live="polite"
          className="lg:col-span-6 lg:col-start-7"
        >
          <svg width="0" height="0" className="absolute" aria-hidden>
            <defs>
              <clipPath id="tema-piece" clipPathUnits="objectBoundingBox">
                <path
                  d={PIECE_D}
                  transform={`scale(${1 / BOX_W} ${1 / BOX_H})`}
                />
              </clipPath>
            </defs>
          </svg>
          <div className="relative aspect-[5/4] w-full" data-reveal="scale">
            {/* Silueta del lugar de la pieza, en tono plano */}
            <div aria-hidden className="tema-socket absolute inset-0 bg-aqua" />
            <div
              className="tema-piece relative h-full w-full overflow-hidden bg-sage"
              style={{ "--tilt": `${TILT[active]}deg` } as CSSProperties}
            >
              {temas.map((t, i) => (
                <Image
                  key={t.id}
                  src={t.image}
                  alt={i === active ? t.alt : ""}
                  aria-hidden={i !== active}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={i === 0}
                  className={`tema-img object-cover ${i === active ? "is-active drift" : ""}`}
                />
              ))}
              {/* Borde interior: la pieza se lee aunque la foto sea clara */}
              <svg
                aria-hidden
                viewBox={`0 0 ${BOX_W} ${BOX_H}`}
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <path
                  d={PIECE_D}
                  fill="none"
                  stroke="var(--deep)"
                  strokeWidth={4}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>

          <div
            key={tema.id}
            className="tema-copy mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end"
          >
            <div>
              <h3 className="text-lead font-extrabold tracking-[-0.03em]">
                {tema.title}
              </h3>
              <p className="mt-3 max-w-[52ch] text-body">{tema.text}</p>
              {tema.extra && (
                <Link
                  href={tema.extra.href}
                  className="link mt-3 inline-block font-semibold"
                >
                  {tema.extra.label}
                </Link>
              )}
            </div>
            <a
              href={whatsappLink(
                `Hola Sergio, me gustaría consultarte por ${tema.name.toLowerCase()}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-teal"
            >
              Consultar por esto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QueTeTrae;
