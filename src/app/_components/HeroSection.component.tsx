import { Button, Image } from "@nextui-org/react";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative  flex h-fit min-h-[350px] w-full   items-center"
      style={{
        backgroundImage: `url('/images/bg-hero.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      id="hero_section"
    >
      <div className="absolute h-full w-full bg-primary-dark opacity-40"></div>
      <div className=" mx-auto flex w-[80%]  max-w-[1200px] flex-col items-center justify-center py-5">
        <div className=" align-items-center grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2">
          <Image
            src="/images/logo-hq-variable2.png"
            width={450}
            height={450}
            style={{
              filter: "drop-shadow(10px 20px 20px rgba(0, 0, 0, 0.90))",
            }}
          />
          <div
            className="max-w- flex flex-col font-raleway  font-semibold"
            style={{
              filter: "drop-shadow(10px 20px 20px rgba(0, 0, 0, 0.90))",
            }}
          >
            <h1 className=" text-center text-4xl italic text-white md:text-start">
              Encuentra bienestar cuidando tu salud mental
            </h1>
            <p className="text-center text-2xl text-white md:text-start">
              En todo momento y lugar.
            </p>
          </div>
        </div>
        <div className="flex justify-center py-5">
          <Button
            className=" min-w-[200px] py-6 font-poppins text-xl"
            variant="solid"
            color="primary"
            style={{
              filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.50))",
            }}
          >
            ¡Contactame!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
