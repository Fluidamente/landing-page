import React, { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Righteous, Open_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./utils/providers";
import NavbarApp from "./_components/NavbarApp";

const righteous = Righteous({
  subsets: ["latin-ext"],
  weight: "400",
  style: "normal",
  variable: "--font-righteous",
});
const openSans = Open_Sans({
  subsets: ["latin-ext"],
  weight: "400",
  style: "normal",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Fluidamente",
  description: "Cursos de psicologia online",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <body className={`${righteous.variable} ${openSans.variable} font-sans`}>
        <NavbarApp />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
