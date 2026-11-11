import React, { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./utils/providers";
import NavbarApp from "./_components/NavbarApp";
import RevealObserver from "./_components/RevealObserver";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "800"],
  variable: "--font-schibsted",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fluidamente · Terapia online con el Lic. Sergio Lépori",
  description:
    "Terapia psicológica online por videollamada con el Lic. Sergio Lépori, cursos y el ebook El camino consciente del duelo.",
  openGraph: {
    images: [
      {
        url: "/images/mind_puzzle.png",
        width: 638,
        height: 690,
        alt: "Fluidamente",
      },
    ],
  },
};

// Marca <html> con .js antes de pintar: las entradas animadas solo
// ocultan contenido cuando hay JavaScript para mostrarlo.
const jsFlag = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es" className={schibsted.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="bg-ground font-sans text-ink">
        <NavbarApp />
        <Providers>{children}</Providers>
        <RevealObserver />
      </body>
    </html>
  );
}
