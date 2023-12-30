import React, {PropsWithChildren} from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './utils/providers'
import Header from './utils/Header.component'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fluidamente',
  description: 'Cursos de psicologia online',
}

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
