import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";

export default function NavbarApp() {
  return (
    <Navbar className="flex justify-center bg-white py-2 font-righteous font-normal text-secondary  ">
      <NavbarContent className="hidden gap-4 sm:flex" justify="end">
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="text-md md:text-xl lg:text-2xl"
          >
            INICIO
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            href="#"
            className="text-md md:text-xl lg:text-2xl"
            aria-current="page"
          >
            CURSOS
          </Link>
        </NavbarItem>
      </NavbarContent>
      <div className=" flex h-20 w-20 items-center justify-center ">
        <Image
          src="/images/isotipo.png"
          width="50"
          height="50"
          alt="Fluidamente logo"
        />
      </div>
      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="text-md md:text-xl lg:text-2xl"
          >
            BLOG
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="text-md md:text-xl lg:text-2xl"
          >
            CONTACTO
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
