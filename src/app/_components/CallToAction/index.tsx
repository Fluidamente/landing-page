import { Image } from "@nextui-org/react";
import { Facebook, Instagram, Whatsapp } from "iconsax-react";
import Link from "next/link";
import React from "react";

const CallToAction = () => {
  return (
    <div
      className=" relative mx-auto mt-10  flex w-[80%] max-w-[1200px] flex-col items-center justify-center bg-tertiary p-10"
      style={{
        borderRadius: "40px",
      }}
    >
      <div className="max-w- flex flex-col font-normal ">
        <h2 className="pb-4 text-center font-poppins text-5xl font-semibold text-secondary">
          ¡Seguinos en redes!
        </h2>
        <h3 className="text-start font-raleway text-3xl text-secondary">
          Y accedé a mucho contenido sobre ...
        </h3>
        <div className="mt-5 flex justify-center gap-4 md:mt-10">
          <Link href="https://www.instagram.com/_fluidamente" target="_blank">
            <Instagram
              size="3rem"
              className="text-secondary transition-all duration-300 ease-in-out hover:scale-110 hover:text-white"
              variant="Bold"
            />
          </Link>
          <Link
            href="https://wa.me/5493756417801?text=Buenas%20tardes%20Lic.%20Lepori%2C%20me%20interesa%20concertar%20una%20sesi%C3%B3n."
            target="_blank"
          >
            <Whatsapp
              size="3rem"
              className="text-secondary transition-all duration-300 ease-in-out hover:scale-110 hover:text-white"
              variant="Bold"
            />
          </Link>
          {/* <Link href="https://www.facebook.com/_fluidamente" target="_blank">
            <Facebook size="3rem" className="text-secondary transition-all duration-300 ease-in-out hover:scale-110 hover:text-white" variant="Bold" />
          </Link> */}
        </div>
        <div className="absolute bottom-0 left-0 flex justify-center gap-4 p-3 md:p-5">
          <Image
            src="/images/mind_puzzle.png"
            width={300}
            height={300}
            className="h-24 w-24 md:h-28 md:w-28 lg:h-40 lg:w-40"
            alt="Mind puzzle"
          />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
