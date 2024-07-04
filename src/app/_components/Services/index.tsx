import React from "react";
import ServiceCard from "./ServiceCard";

const Services: React.FC = () => {
  return (
    <div className=" mx-auto mt-10 flex  w-[80%] max-w-[1200px] flex-col items-center justify-center ">
      <h2 className="py-6 font-righteous text-4xl text-primary-dark">
        Servicios
      </h2>
      <div className=" align-items-center grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2">
        <ServiceCard
          imageSrc="/images/therapy.png"
          title="Terapia Online"
          content="La atención en terapia online te permite
trabajar y mejorar tu salud emocional desde
la comodidad de tu hogar. Con sesiones por
videollamada, que se ajustan a tus horarios y
adaptándose a tus necesidades."
        />
        <ServiceCard
          imageSrc="/images/online_course.jpg"
          title="Cursos y talleres"
          content="Podes acceder al contenido de cursos y
talleres diseñados específicamente para
tratar una temática en particular, con clases y
actividades pensadas para que alcances el
cambio que estás buscando, cuando quieras y
desde donde estés."
        />
      </div>
    </div>
  );
};

export default Services;
