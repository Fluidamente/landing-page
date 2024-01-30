"use client";

import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";

export enum queryKeys {}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
      <Toaster richColors />
    </NextUIProvider>
  );
}
