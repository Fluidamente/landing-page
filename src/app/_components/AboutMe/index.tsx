"use client";
import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";

const AboutMe: React.FC = () => {
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
        <div className="max-w- flex flex-col  font-poppins font-normal ">
          <h2 className=" pb-4 text-center text-3xl  font-semibold text-white md:text-justify">
            Sobre mí...
          </h2>
          <p className="text-md text-justify text-white lg:text-lg">
            Soy Sergio Lépori, Licenciado en Psicología graduado en 2015.
          </p>
          <p className="text-md text-justify text-white lg:text-lg">
            Desde entonces trabajo con personas que buscan equilibrar su salud
            mental y que esto influya de manera positiva en su vida.
          </p>
          <p className="text-md text-justify text-white lg:text-lg">
            En cada sesión intentamos enfocarnos en el presente, evaluando las
            emociones y situaciones actuales, así como las experiencias pasadas
            que puedan influir en la actualidad.
          </p>
          <p className="text-md text-justify text-white lg:text-lg">
            Para ello es necesario trabajar sobre el modo en que nos
            relacionamos con nosotros mismos y con los demás, promoviendo la
            aceptación y la comprensión del desarrollo que tuvimos a largo de
            nuestra vida, reevaluando y modificando ciertos aspectos que generen
            malestar.
          </p>
          <p className="text-md text-justify text-white lg:text-lg">
            El fin de todo esto es encontrar bienestar en el Aquí y Ahora,
            fomentar un crecimiento continuo y funcional en la vida diaria.
          </p>
        </div>
        <div className="flex flex-col items-center justify-start ">
          <Image
            src="/images/about_me_image.png"
            width={450}
            height={800}
            style={{
              borderRadius: isMobile ? "40px" : "0px 40px 40px 0px",
            }}
            alt="profile picture"
          />
          <Button
            className=" mt-8 w-[250px] p-6 font-poppins text-xl"
            variant="solid"
            color="primary"
            style={{
              filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.50))",
            }}
          >
            <Link
              href="https://wa.me/5493756417801?text=Buenas%20tardes%20Lic.%20Lepori%2C%20me%20interesa%20concertar%20una%20sesi%C3%B3n."
              target="_blank"
            >
              Agendar una sesión
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
