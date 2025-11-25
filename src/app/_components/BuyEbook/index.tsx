"use client";
import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";

const BuyEbook: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className=" mx-auto mt-10 flex  w-[80%] max-w-[1200px] flex-col items-center justify-center bg-primary-light p-10"
      style={{
        borderRadius: "40px",
      }}
    >
      <div className=" align-items-center grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center justify-start ">
          <Image
            src="/images/el_camino_consciente_del_duelo.jpeg"
            width={450}
            height={800}
            alt='Ebook "El camino consciente del duelo" cover image'
          />
        </div>
        <div className="max-w- flex flex-col  items-center font-poppins font-normal ">
          <h2 className=" pb-4 text-center text-3xl  font-semibold text-white md:text-start">
            Ebook &quot;El camino consciente del duelo&quot;
          </h2>
          <p className="text-md text-start text-white">
            &quot;El camino consciente del duelo&quot; es para quienes están
            atravesando una pérdida y no saben por dónde empezar.
          </p>
          <p className="text-md text-start text-white">
            No promete alivio inmediato, pero sí acompañarte a entender lo que
            te pasa, ponerle nombre al dolor y encontrar un modo más amable de
            transitarlo.
          </p>
          <p className="text-md text-start text-white">
            Si necesitás orientación clara, contención y un espacio que respete
            tus tiempos, este ebook puede ayudarte hoy.
          </p>

          <Button
            className=" mt-8 w-[250px] p-6 font-poppins text-xl"
            variant="solid"
            color="primary"
            style={{
              filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.50))",
            }}
          >
            <Link href="#">Comprar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyEbook;
