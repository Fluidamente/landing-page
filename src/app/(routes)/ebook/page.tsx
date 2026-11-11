import BuyEbook from "@/app/_components/BuyEbook";
import Footer from "@/app/_components/Footer";
import React from "react";

export default function EbookPage() {
  return (
    <>
      <main className="min-h-[100svh] bg-ground">
        <BuyEbook asPage />
      </main>
      <Footer />
    </>
  );
}
