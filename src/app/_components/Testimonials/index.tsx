import React, { CSSProperties } from "react";
import { testimonials } from "./Testimonials.constants";

// Mensajes de pacientes como notas de papel, abanicadas.
const tilt = ["-3deg", "2deg", "-1.5deg", "3deg"];
const drop = ["0px", "56px", "16px", "72px"];

const Testimonials = () => {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="wrap bg-sage pb-section pt-section"
    >
      <h2
        id="testimonios-title"
        className="heading max-w-[14ch] text-ink"
        data-reveal
      >
        Lo que me escriben
      </h2>

      <ul className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
        {testimonials.map((t, i) => (
          <li
            key={t.id}
            className="slip-wrap"
            style={
              {
                "--tilt": tilt[i % tilt.length],
                "--drop": drop[i % drop.length],
                "--i": i,
              } as CSSProperties
            }
            data-reveal
          >
            <figure className="slip relative bg-white px-7 pb-8 pt-10 text-ink">
              <span
                aria-hidden
                className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal"
              />
              <blockquote className="flex flex-col gap-3">
                {t.content.map((c, idx) => (
                  <p key={idx}>{c.replace(/^"|"$/g, "")}</p>
                ))}
              </blockquote>
              <figcaption className="mt-5 font-semibold text-slate">
                Mensaje de un paciente
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Testimonials;
