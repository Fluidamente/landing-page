import BuyEbook from "@/app/_components/BuyEbook";
import React from "react";

export default function EbookPage() {
  return (
    <main
      className="flex min-h-screen flex-col py-10"
      style={{
        background:
          "linear-gradient(0deg, rgba(130,171,165,1) 0% , rgba(240,255,245,1) 65% , rgba(255,255,255,1) 100%)",
      }}
    >
      <BuyEbook />
    </main>
  );
}
