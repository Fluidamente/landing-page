import Image from "next/image";
import Link from "next/link";
import React from "react";

const UnderConstruction = ({ title = "Estamos armando esta sección" }) => {
  return (
    <main className="wrap flex min-h-[calc(100svh-64px)] flex-col items-start justify-center gap-8 bg-ground py-section md:flex-row md:items-center md:justify-between">
      <div className="max-w-[34ch]">
        <h1 className="heading">{title}</h1>
        <p className="mt-5">
          Muy pronto vas a encontrar acá cursos y talleres por temática.
          Mientras tanto, podés escribirme o conocer el ebook.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/#contacto" className="btn btn-teal">
            Escribirme
          </Link>
          <Link href="/ebook" className="btn bg-aqua text-ink">
            Ver el ebook
          </Link>
        </div>
      </div>
      <Image
        src="/images/isotipo.png"
        width={420}
        height={380}
        alt=""
        className="h-auto w-[60vw] max-w-[420px]"
      />
    </main>
  );
};

export default UnderConstruction;
