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
export default function App() {
  return (
    <Navbar className="absolute mx-auto max-w-[1200px] rounded-[50px] border-r-medium bg-secondary font-righteous">
      <NavbarContent className="flex justify-center" justify="start">
        <NavbarItem className="w-[250px]">
          <Image src="/images/logo-hq-variable2.png" width={100} height={70} />
        </NavbarItem>
        <NavbarContent
          className="flex w-full gap-20"
          justify="center"
          id="navbarcontent"
        >
          <NavbarItem className="">
            <Link href="#" className="text-white">
              Sobre mí
            </Link>
          </NavbarItem>
          <NavbarItem className="">
            <Link href="#" className="text-white">
              Servicios
            </Link>
          </NavbarItem>
          <NavbarItem className="">
            <Link href="#" className="text-white">
              Resumen
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" className="text-white">
              Contacto
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
}
