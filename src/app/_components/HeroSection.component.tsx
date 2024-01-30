import { Image } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <div
      className="flex h-screen w-full items-center justify-center"
      style={{
        backgroundImage: `url('/images/hero-section.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="relative mx-auto flex h-[80%]  min-h-[600px] w-[80%] max-w-[1200px]  items-center font-righteous">
        <div className="absolute flex h-full w-full items-center justify-center bg-white opacity-50">
          <div className="flex h-full w-[20%] flex-col items-center justify-between gap-10 py-10">
            <Link href="#" className="text-2xl text-black">
              Sobre mí
            </Link>
            <Link href="#" className="text-2xl text-black">
              Servicios
            </Link>
          </div>

          <div className="mx-auto flex h-[500px] w-[500px] items-center justify-center rounded-full   ">
            <Image
              src="/images/logo-hq-variable1.png"
              width={300}
              height={300}
              style={{ opacity: 1 }}
            />
          </div>
          <div className="flex h-full w-[20%] flex-col items-center justify-between gap-10 py-10">
            <Link href="#" className="text-2xl text-black">
              Resumen
            </Link>
            <Link href="#" className="text-2xl text-black">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
