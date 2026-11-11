"use client";
import React, { CSSProperties, useRef, useState } from "react";
import { whatsappLink } from "@/lib/site";
import PuzzlePortrait from "./PuzzlePortrait";

const AboutMe: React.FC = () => {
  const trackRef = useRef<HTMLElement>(null);
  const [fitted, setFitted] = useState(false);
  const fit = () => setFitted(true);

  return (
    <section
      id="sobre-mi"
      ref={trackRef}
      aria-labelledby="sobre-mi-title"
      className="relative overflow-x-clip bg-slate text-white stage:h-[230svh]"
    >
      <div className="wrap grid grid-cols-1 gap-x-6 gap-y-10 py-section lg:grid-cols-12 lg:grid-rows-[1fr_auto_1fr] stage:sticky stage:top-16 stage:h-[calc(100svh-64px)] stage:py-10">
        <div className="lg:col-span-7 lg:row-span-3 lg:row-start-1 lg:flex lg:h-full lg:items-center">
          <figure className="relative mx-auto w-full lg:max-w-[600px] stage:max-w-[calc((100svh-150px)*0.97)]">
            <PuzzlePortrait fitted={fitted} trackRef={trackRef} />
            <figcaption
              className={`puzzle-caption mt-4 text-lead font-extrabold leading-tight tracking-[-0.02em] lg:absolute lg:bottom-[2%] lg:right-0 lg:mt-0 lg:w-[26%] lg:text-right ${fitted ? "is-done" : ""}`}
            >
              {fitted
                ? "Ahora sí, empecemos."
                : "La última pieza la ponemos juntos."}
            </figcaption>
          </figure>
        </div>

        <h2
          id="sobre-mi-title"
          className="heading order-first max-w-[11ch] lg:order-none lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-end"
          data-reveal
        >
          Trabajar en el aquí y ahora
        </h2>

        <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9 lg:row-start-2">
          <div data-reveal style={{ "--i": 1 } as CSSProperties}>
            <h3 className="text-lead font-extrabold tracking-[-0.03em]">
              Quién soy
            </h3>
            <p className="mt-2">
              Soy Sergio Lépori, Licenciado en Psicología, graduado en 2015.
              Desde entonces acompaño a personas que buscan equilibrar su salud
              mental y que eso se note, de manera positiva, en su vida diaria.
            </p>
          </div>
          <div data-reveal style={{ "--i": 2 } as CSSProperties}>
            <h3 className="text-lead font-extrabold tracking-[-0.03em]">
              Cómo trabajo
            </h3>
            <p className="mt-2">
              En cada sesión nos enfocamos en el presente: las emociones y
              situaciones actuales, y las experiencias pasadas que todavía
              influyen. Trabajamos el modo en que te relacionás con vos y con
              los demás, para modificar lo que genera malestar.
            </p>
          </div>
        </div>

        <div
          className="lg:col-span-4 lg:col-start-9 lg:row-start-3 lg:self-start"
          data-reveal
          style={{ "--i": 3 } as CSSProperties}
        >
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-aqua"
            onMouseEnter={fit}
            onFocus={fit}
            onClick={fit}
          >
            Agendar una sesión
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
