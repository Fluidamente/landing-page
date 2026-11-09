"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { puzzleGrid, rand } from "@/lib/puzzle";
import { STAGE_QUERY } from "@/lib/site";

const COLS = 4;
const ROWS = 5;
const CELL = 100;
const MISSING = 14; // fila 4, columna 3: la pieza que falta
const FLOAT = { x: 238, y: -46, rot: 14 }; // dónde espera la pieza suelta

const IMG = "/images/piezas/sergio.jpg";

type Props = {
  /** La pieza suelta encaja cuando es true */
  fitted: boolean;
  /** Elemento que define el avance del armado (la sección fijada) */
  trackRef: React.RefObject<HTMLElement>;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (n: number) => Math.min(1, Math.max(0, n));

export default function PuzzlePortrait({ fitted, trackRef }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const groups = useRef<(SVGGElement | null)[]>([]);

  const pieces = useMemo(() => {
    const grid = puzzleGrid(COLS, ROWS, CELL);
    // orden de llegada aleatorio pero estable
    const order = grid
      .map((p) => ({ id: p.id, k: rand(p.id + 101) }))
      .sort((a, b) => a.k - b.k)
      .map((o) => o.id);
    return grid.map((p) => ({
      ...p,
      dx: (rand(p.id + 11) - 0.5) * 520,
      dy: (rand(p.id + 23) - 0.45) * 460,
      rot: (rand(p.id + 37) - 0.5) * 70,
      delay: (order.indexOf(p.id) / grid.length) * 0.55,
    }));
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(STAGE_QUERY);
    let raf = 0;
    let current = 0;

    const target = () => {
      const vh = window.innerHeight;
      if (desktop.matches && trackRef.current) {
        const r = trackRef.current.getBoundingClientRect();
        const travel = r.height - (vh - 64);
        return clamp((64 - r.top) / (travel * 0.8));
      }
      const svg = svgRef.current;
      if (!svg) return 1;
      const r = svg.getBoundingClientRect();
      return clamp((vh * 0.92 - r.top) / (vh * 0.75));
    };

    const paint = (p: number) => {
      pieces.forEach((pc, i) => {
        const g = groups.current[i];
        if (!g) return;
        const local = clamp((p - pc.delay) / 0.45);
        const e = easeOut(local);
        const k = 1 - e;
        if (pc.id === MISSING) {
          if (g.dataset.fitted === "true") return;
          g.style.transform = `translate(${FLOAT.x + pc.dx * 0.4 * k}px, ${FLOAT.y + pc.dy * 0.4 * k}px) rotate(${FLOAT.rot + pc.rot * k}deg)`;
        } else {
          g.style.transform = `translate(${pc.dx * k}px, ${pc.dy * k}px) rotate(${pc.rot * k}deg)`;
        }
        g.style.opacity = String(clamp(0.55 + local * 2));
      });
    };

    // Inercia: cada frame la posición "current" persigue el target del
    // scroll con damping, en vez de saltar directo al valor crudo — da el
    // efecto de encaje fluido en lugar de pasos discretos por evento.
    const SMOOTH = 0.14;
    const tick = () => {
      const t = target();
      current += (t - current) * SMOOTH;
      const settled = Math.abs(t - current) < 0.0004;
      if (settled) current = t;
      paint(current);
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    if (reduce.matches) {
      current = 1;
      paint(1);
    } else {
      current = target();
      paint(current);
      window.addEventListener("scroll", kick, { passive: true });
      window.addEventListener("resize", kick);
    }
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      cancelAnimationFrame(raf);
    };
  }, [pieces, trackRef]);

  // Encajar la pieza suelta (con transición CSS)
  useEffect(() => {
    const i = pieces.findIndex((p) => p.id === MISSING);
    const g = groups.current[i];
    if (!g) return;
    if (fitted) {
      g.dataset.fitted = "true";
      g.style.opacity = "1";
      g.style.transform = "translate(0px, 0px) rotate(0deg)";
    }
  }, [fitted, pieces]);

  const missing = pieces.find((p) => p.id === MISSING)!;

  return (
    <svg
      ref={svgRef}
      viewBox="-12 -90 584 604"
      className="puzzle-portrait block h-auto w-full overflow-visible"
      role="img"
      aria-label="Retrato de Sergio Lépori armado como un rompecabezas"
    >
      <defs>
        {pieces.map((p) => (
          <clipPath id={`pz-${p.id}`} key={p.id}>
            <path d={p.d} />
          </clipPath>
        ))}
      </defs>

      {/* El hueco que deja la pieza que falta */}
      <path d={missing.d} className="puzzle-hole" />

      {pieces.map((p, i) => (
        <g
          key={p.id}
          ref={(el) => {
            groups.current[i] = el;
          }}
          className={`puzzle-piece ${p.id === MISSING ? "is-loose" : ""}`}
          style={
            p.id === MISSING
              ? {
                  transform: `translate(${FLOAT.x}px, ${FLOAT.y}px) rotate(${FLOAT.rot}deg)`,
                }
              : undefined
          }
        >
          <image
            href={IMG}
            x={0}
            y={0}
            width={COLS * CELL}
            height={ROWS * CELL}
            preserveAspectRatio="xMidYMin slice"
            clipPath={`url(#pz-${p.id})`}
          />
          <path d={p.d} className="puzzle-seam" />
        </g>
      ))}
    </svg>
  );
}
