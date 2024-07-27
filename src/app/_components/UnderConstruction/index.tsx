import React from "react";

const UnderConstruction = () => {
  return (
    <div
      className="flex min-h-screen flex-col py-5"
      style={{
        background:
          "linear-gradient(0deg, rgba(130,171,165,1) 0% , rgba(240,255,245,1) 65% , rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="w-full lg:container lg:mx-auto">
        <div className="flex flex-col items-center justify-center text-2xl md:text-3xl ">
          <h2 className="text-center font-poppins text-4xl text-primary-dark">
            SITIO EN CONSTRUCCIÓN
          </h2>
          <div className="order-1 col-span-3 py-10 md:order-2">
            <img src={"images/logo-hq-variable3.png"} alt="error" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
