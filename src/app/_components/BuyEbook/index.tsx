"use client";
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import React from "react";

const BuyEbook: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleConfirmBuy = async () => {
    setIsRedirecting(true);
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    window.location.href = data.init_point;
  };

  return (
    <section
      id="buy_ebook_section"
      className=" mx-auto mt-10 flex  w-[80%] max-w-[1200px] flex-col items-center justify-center bg-primary-light p-10"
      style={{
        borderRadius: "40px",
      }}
    >
      <div className=" align-items-center grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center justify-start ">
          <Image
            src="/images/el_camino_consciente_del_duelo.jpeg"
            width={450}
            height={800}
            alt='Ebook "El camino consciente del duelo" cover image'
          />
        </div>
        <div className="max-w- flex flex-col  items-center font-poppins font-normal ">
          <h2 className=" pb-4 text-center text-3xl  font-semibold text-white md:text-start">
            Ebook &quot;El camino consciente del duelo&quot;
          </h2>
          <p className="text-md text-start text-white">
            &quot;El camino consciente del duelo&quot; es para quienes están
            atravesando una pérdida y no saben por dónde empezar.
          </p>
          <p className="text-md text-start text-white">
            No promete alivio inmediato, pero sí acompañarte a entender lo que
            te pasa, ponerle nombre al dolor y encontrar un modo más amable de
            transitarlo.
          </p>
          <p className="text-md text-start text-white">
            Si necesitás orientación clara, contención y un espacio que respete
            tus tiempos, este ebook puede ayudarte hoy.
          </p>

          <Button
            className=" mt-8 w-[250px] p-6 font-poppins text-xl"
            variant="solid"
            color="primary"
            style={{
              filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.50))",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Comprar
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmar redirección
              </ModalHeader>
              <ModalBody>
                <p>
                  Vas a ser redirigido a la aplicación de MercadoPago para
                  completar el pago de forma segura.
                </p>
                <p className="text-sm text-default-500">
                  Una vez finalizado, volverás automáticamente a este sitio.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  disabled={isRedirecting}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={handleConfirmBuy}
                  isLoading={isRedirecting}
                >
                  Confirmar y continuar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default BuyEbook;
