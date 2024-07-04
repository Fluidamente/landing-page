import { Image } from "@nextui-org/react";
import { Facebook, Instagram } from "iconsax-react";
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
      <div className="max-w- flex flex-col  font-openSans font-normal ">
        <h1 className=" pb-4 text-center font-righteous text-5xl font-bold text-secondary">
          ¡Seguinos en redes!
        </h1>
        <h3 className="text-start text-3xl text-secondary">
          Y accedé a mucho contenido sobre ...
        </h3>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="https://www.instagram.com/fluidamente" target="_blank">
            <Instagram size="3rem" className="text-secondary" variant="Bold" />
          </Link>
          <Link href="https://www.facebook.com/fluidamente" target="_blank">
            <Facebook size="3rem" className="text-secondary" variant="Bold" />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 mt-5 flex justify-center gap-4 p-3">
          <Image src="/images/mind_puzzle.png" width={100} height={100} />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
