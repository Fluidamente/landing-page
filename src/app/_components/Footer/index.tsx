import React from "react";

const Footer = () => {
  return (
    <section className="flex flex-col items-end justify-center p-2 font-chillax text-xs opacity-90 md:px-4">
      <p className="text-white">creado por</p>
      <a
        href="https://yaguaretech.net"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/images/yaguaretech.svg"
          alt="Yaguaretech Logo"
          className="h-8 w-auto"
        />
      </a>
    </section>
  );
};

export default Footer;
