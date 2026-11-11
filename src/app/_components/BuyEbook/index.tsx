"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { CSSProperties, useState } from "react";
import { EBOOK_PRICE, EBOOK_TITLE, formatPrice } from "@/lib/site";

interface BuyEbookProps {
  linkToPage?: boolean;
  /** En /ebook el título es el h1 de la página */
  asPage?: boolean;
}

const BuyEbook: React.FC<BuyEbookProps> = ({
  linkToPage = false,
  asPage = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const Title = asPage ? "h1" : "h2";

  const handleConfirmBuy = async () => {
    setIsRedirecting(true);

    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();

      if (!res.ok || !data?.init_point) {
        throw new Error(data?.error || "No se pudo iniciar el checkout.");
      }

      window.location.href = data.init_point;
    } catch (error) {
      console.error("Error creating checkout:", error);
      alert("No pudimos iniciar el pago. Por favor, intentá nuevamente.");
      setIsRedirecting(false);
    }
  };

  return (
    <section
      id="ebook"
      aria-labelledby="ebook-title"
      className="wrap overflow-hidden py-section"
    >
      <div className="grid grid-cols-1 items-center gap-x-6 gap-y-14 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <Title id="ebook-title" className="heading" data-reveal>
            {EBOOK_TITLE}
          </Title>
          <div
            className="mt-6 flex max-w-[46ch] flex-col gap-3"
            data-reveal
            style={{ "--i": 1 } as CSSProperties}
          >
            <p className="text-lead">
              Para quienes están atravesando una pérdida y no saben por dónde
              empezar.
            </p>
            <p>
              No promete alivio inmediato, pero sí acompañarte a entender lo que
              te pasa, ponerle nombre al dolor y encontrar un modo más amable de
              transitarlo.
            </p>
            <p>
              Si necesitás orientación clara, contención y un espacio que
              respete tus tiempos, este ebook puede ayudarte hoy.
            </p>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            data-reveal
            style={{ "--i": 2 } as CSSProperties}
          >
            <p className="text-head font-extrabold">
              {formatPrice(EBOOK_PRICE)}
            </p>
            {linkToPage ? (
              <Link href="/ebook" className="btn btn-teal">
                Comprar el ebook
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-teal"
                onClick={() => setIsModalOpen(true)}
              >
                Comprar el ebook
              </button>
            )}
          </div>
          <ul
            className="mt-10 flex flex-col gap-2 font-semibold"
            data-reveal
            style={{ "--i": 3 } as CSSProperties}
          >
            <li className="flex items-center gap-3">
              <span className="knob-dot text-teal" aria-hidden />
              Tareas vivenciales para transformar la pérdida
            </li>
            <li className="flex items-center gap-3">
              <span className="knob-dot text-teal" aria-hidden />
              PDF que se descarga al confirmar el pago
            </li>
            <li className="flex items-center gap-3">
              <span className="knob-dot text-teal" aria-hidden />
              Pago seguro con Mercado Pago
            </li>
          </ul>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:col-span-6 lg:justify-end">
          <div className="relative flex justify-center">
            <div
              aria-hidden
              className="ebook-disc aspect-square w-[86vw] rounded-full bg-teal md:w-[min(64vh,60vw)] lg:w-[min(64vh,46vw)]"
              data-reveal="scale"
            />
            <div className="ebook-cover absolute bottom-[4%] aspect-[512/800] w-[57vw] md:w-[min(42vh,39vw)] lg:w-[min(42vh,30vw)]">
              <Image
                src="/images/el_camino_consciente_del_duelo.jpeg"
                alt={`Tapa del ebook ${EBOOK_TITLE}, de Sergio Lépori`}
                fill
                sizes="(min-width: 768px) 20vw, 44vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        placement="center"
        backdrop="opaque"
        classNames={{ base: "rounded-none font-sans text-ink" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lead font-extrabold">
                Vas a pagar con Mercado Pago
              </ModalHeader>
              <ModalBody>
                <p>
                  Te llevamos a Mercado Pago para completar el pago de forma
                  segura.
                </p>
                <p>
                  Cuando termines, volvés a este sitio y la descarga empieza
                  sola.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="full"
                  variant="light"
                  onPress={onClose}
                  isDisabled={isRedirecting}
                >
                  Cancelar
                </Button>
                <Button
                  radius="full"
                  className="bg-teal font-semibold text-white"
                  onPress={handleConfirmBuy}
                  isLoading={isRedirecting}
                >
                  Continuar al pago
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
