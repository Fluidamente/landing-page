import React, { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Raleway, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./utils/providers";
import NavbarApp from "./_components/NavbarApp";

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: "400",
  style: "normal",
  variable: "--font-poppins",
});

const raleway = Raleway({
  subsets: ["latin-ext"],
  weight: "400",
  style: "normal",
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Fluidamente",
  description: "Cursos de psicologia online",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${raleway.variable} font-sans`}>
        <NavbarApp />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
