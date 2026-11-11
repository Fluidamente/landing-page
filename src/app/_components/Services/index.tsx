import Link from "next/link";
import React, { CSSProperties } from "react";
import { EBOOK_PRICE, formatPrice } from "@/lib/site";
import { Edges, piecePath } from "@/lib/puzzle";

type Service = {
  name: string;
  fact: string;
  href: string;
  image: string;
  alt: string;
  bg: string;
  cover?: boolean;
};

const services: Service[] = [
  {
    name: "Terapia online",
    fact: "Sesiones por videollamada, en horarios que se ajustan a los tuyos.",
    href: "#contacto",
    image: "/images/piezas/terapia.jpg",
    alt: "Una sesión por videollamada en una computadora portátil",
    bg: "var(--deep)",
  },
  {
    name: "Cursos y talleres",
    fact: "Clases y actividades sobre una temática, para hacer cuando quieras. Próximamente.",
    href: "/cursos",
    image: "/images/piezas/cursos-grupo.jpg",
    alt: "Un grupo pequeño sentado en ronda, de espaldas, escucha a quien coordina el taller",
    bg: "var(--ground)",
  },
  {
    name: "Ebook sobre el duelo",
    fact: `El camino consciente del duelo · ${formatPrice(EBOOK_PRICE)}`,
    href: "#ebook",
    image: "/images/el_camino_consciente_del_duelo.jpeg",
    alt: "Tapa del ebook El camino consciente del duelo",
    bg: "var(--sage)",
    cover: true,
  },
];

// Tres piezas que encajan: perilla de una entra en el encastre de la otra.
function PiecesRow({ vertical }: { vertical: boolean }) {
  const W = vertical ? 150 : 120;
  const H = vertical ? 120 : 150;
  const n = services.length;
  const vbW = vertical ? W : W * n;
  const vbH = vertical ? H * n : H;
  const pad = 0.32 * Math.min(W, H); // lo que sobresale una perilla
  const edgesFor = (i: number): Edges => {
    const first = i === 0;
    const last = i === n - 1;
    return vertical
      ? { top: first ? 0 : -1, bottom: last ? 0 : 1, left: 0, right: 0 }
      : { left: first ? 0 : -1, right: last ? 0 : 1, top: 0, bottom: 0 };
  };

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      className="block h-auto w-full overflow-visible"
      aria-hidden={false}
    >
      <defs>
        {services.map((s, i) => {
          const edges = edgesFor(i);
          const x = vertical ? 0 : i * W;
          const y = vertical ? i * H : 0;
          return (
            <clipPath id={`svc-${vertical ? "v" : "h"}-${i}`} key={s.name}>
              <path d={piecePath(x, y, W, H, edges)} />
            </clipPath>
          );
        })}
      </defs>
      {services.map((s, i) => {
        const x = vertical ? 0 : i * W;
        const y = vertical ? i * H : 0;
        const clip = `url(#svc-${vertical ? "v" : "h"}-${i})`;
        // el área de la pieza incluye su perilla
        const bx = vertical ? x : x - pad;
        const by = vertical ? y - pad : y;
        const bw = vertical ? W : W + pad * 2;
        const bh = vertical ? H + pad * 2 : H;
        return (
          <a
            key={s.name}
            href={s.href}
            className="svc-piece"
            aria-label={s.name}
            style={{ "--i": i } as CSSProperties}
          >
            <g clipPath={clip}>
              <rect
                x={bx}
                y={by}
                width={bw}
                height={bh}
                style={{ fill: s.bg }}
              />
              {s.cover ? (
                <image
                  href={s.image}
                  x={x + W * 0.18}
                  y={y + H * 0.14}
                  width={W * 0.64}
                  height={H * 0.72}
                  preserveAspectRatio="xMidYMid meet"
                />
              ) : (
                <image
                  href={s.image}
                  x={bx}
                  y={by}
                  width={bw}
                  height={bh}
                  preserveAspectRatio="xMidYMid slice"
                />
              )}
            </g>
            <path d={piecePath(x, y, W, H, edgesFor(i))} className="svc-seam" />
            <title>{s.alt}</title>
          </a>
        );
      })}
    </svg>
  );
}

const Services: React.FC = () => {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-title"
      className="wrap bg-aqua py-section"
    >
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="servicios-title" className="heading" data-reveal>
            Cómo trabajamos
          </h2>
          <p
            className="mt-5 max-w-[30ch]"
            data-reveal
            style={{ "--i": 1 } as CSSProperties}
          >
            Tres formas de acompañarte que encajan entre sí: terapia uno a uno,
            contenidos para hacer a tu ritmo y un libro para los momentos de
            pérdida.
          </p>
        </div>

        {/* Escritorio y tablet: fila horizontal */}
        <div className="hidden md:block lg:col-span-8" data-reveal="scale">
          <PiecesRow vertical={false} />
          <ul className="mt-6 grid grid-cols-3 gap-6">
            {services.map((s) => (
              <li key={s.name} className="pr-[8%]">
                <h3 className="text-[1.25rem] font-extrabold tracking-[-0.03em]">
                  <Link href={s.href} className="svc-link">
                    {s.name} <span aria-hidden>→</span>
                  </Link>
                </h3>
                <p className="mt-1">{s.fact}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Celular: columna vertical con el texto al lado */}
        <div
          className="grid grid-cols-[48%_1fr] grid-rows-3 gap-x-5 md:hidden"
          data-reveal="scale"
        >
          <div className="row-span-3">
            <PiecesRow vertical />
          </div>
          {services.map((s) => (
            <div key={s.name} className="flex flex-col justify-center">
              <h3 className="text-[1.125rem] font-extrabold leading-tight tracking-[-0.03em]">
                <Link href={s.href} className="svc-link">
                  {s.name}
                </Link>
              </h3>
              <p className="mt-1 text-[1rem] leading-snug">{s.fact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
