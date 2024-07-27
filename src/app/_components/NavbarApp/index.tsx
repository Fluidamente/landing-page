"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function NavbarApp() {
  const [activeLink, setActiveLink] = useState("");
  const pathName = usePathname();

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver((entries) => {
      console.log(entries);
      console.log(activeLink, "path", pathName);

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.target.id);

          setActiveLink(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });
    console.log(activeLink);

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <Navbar className="flex justify-center bg-white py-2 font-poppins font-normal text-secondary  ">
      <NavbarContent className="hidden gap-4 sm:flex" justify="end">
        <NavbarItem isActive={activeLink === "hero_section"}>
          <Link
            color={activeLink === "hero_section" ? "primary" : "foreground"}
            href={"/#hero_section"}
            className="text-md md:text-xl lg:text-2xl"
            aria-current={activeLink === "hero_section" ? "page" : undefined}
          >
            INICIO
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={pathName === "/cursos"}
          aria-current={pathName === "/cursos" ? "page" : undefined}
        >
          <Link
            href="/cursos"
            className="text-md md:text-xl lg:text-2xl"
            color={pathName === "/cursos" ? "primary" : "foreground"}
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
        <NavbarItem
          isActive={pathName === "/blog"}
          aria-current={pathName === "/blog" ? "page" : undefined}
        >
          <Link
            color={pathName === "/blog" ? "primary" : "foreground"}
            href="/blog"
            className="text-md md:text-xl lg:text-2xl"
          >
            BLOG
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={activeLink === "contact_form"}
          aria-current={activeLink === "contact_form" ? "page" : undefined}
        >
          <Link
            color={activeLink === "contact_form" ? "primary" : "foreground"}
            href={"/#contact_form"}
            className="text-md md:text-xl lg:text-2xl"
          >
            CONTACTO
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
