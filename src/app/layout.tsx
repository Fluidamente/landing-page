import React, { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Righteous } from "next/font/google";
import "./globals.css";
import { Providers } from "./utils/providers";
import Header from "./utils/Header.component";

const righteous = Righteous({
  subsets: ["latin-ext"],
  weight: "400",
  style: "normal",
  variable: "--font-righteous",
});

export const metadata: Metadata = {
  title: "Fluidamente",
  description: "Cursos de psicologia online",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <body className={`${righteous.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
