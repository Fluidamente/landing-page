"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/react";
import { TickCircle } from "iconsax-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [autoDownloadStarted, setAutoDownloadStarted] = useState(false);

  useEffect(() => {
    const payment_id = searchParams.get("payment_id");
    const collection_id = searchParams.get("collection_id");

    // MercadoPago can send either payment_id or collection_id
    const id = payment_id || collection_id;

    if (id) {
      setPaymentId(id);
      validatePayment(id);
    } else {
      setIsValidating(false);
    }
  }, [searchParams]);

  const validatePayment = async (id: string) => {
    try {
      const response = await fetch(`/api/validate-payment?payment_id=${id}`);
      const data = await response.json();

      if (data.isValid) {
        setIsValid(true);
        // Trigger automatic download after validation
        if (!autoDownloadStarted) {
          setAutoDownloadStarted(true);
          // Small delay to show success message first
          setTimeout(() => {
            handleDownload(id);
          }, 1500);
        }
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.error("Error validating payment:", error);
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleDownload = async (resolvedPaymentId?: string) => {
    const idToUse = resolvedPaymentId ?? paymentId;
    if (!idToUse) return;

    setDownloading(true);
    try {
      const response = await fetch(`/api/download-ebook?payment_id=${idToUse}`);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "el_camino_consciente_del_duelo.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error downloading ebook:", error);
      alert("Error al descargar el ebook. Por favor, intenta nuevamente.");
    } finally {
      setDownloading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-yellow-100">
        <div className="text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <h1 className="mb-4 text-4xl font-bold text-yellow-800">
            Validando pago...
          </h1>
          <p className="text-lg text-yellow-700">
            Por favor espera mientras verificamos tu transacción.
          </p>
        </div>
        <Button
          size="lg"
          color="secondary"
          onClick={() => router.push("/")}
          disabled={downloading}
          className="mt-6 text-lg font-semibold"
        >
          Volver al Inicio
        </Button>
      </div>
    );
  }

  if (!paymentId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-red-100">
        <h1 className="mb-4 text-4xl font-bold text-red-800">
          No se encontró información del pago
        </h1>
        <p className="text-lg text-red-700">
          No pudimos verificar tu transacción.
        </p>
        <Button
          size="lg"
          color="secondary"
          onClick={() => router.push("/")}
          disabled={downloading}
          className="mt-6 text-lg font-semibold"
        >
          Volver al Inicio
        </Button>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-orange-100">
        <h1 className="mb-4 text-4xl font-bold text-orange-800">
          Pago pendiente
        </h1>
        <p className="text-lg text-orange-700">
          Tu pago está siendo procesado. Te notificaremos cuando esté aprobado.
        </p>
        <Button
          size="lg"
          color="secondary"
          onClick={() => router.push("/")}
          disabled={downloading}
          className="mt-6 text-lg font-semibold"
        >
          Volver al Inicio
        </Button>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center p-8"
      style={{
        background:
          "linear-gradient(0deg, rgba(130,171,165,1) 0% , rgba(240,255,245,1) 65% , rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="max-w-2xl text-center">
        <div className="mb-6 flex justify-center text-6xl">
          <TickCircle size="6rem" className="text-primary" />
        </div>
        <h2 className="mb-4 text-4xl font-bold text-primary">
          ¡Compra Exitosa!
        </h2>

        <section
          className="mb-8 rounded-2xl border border-primary/20 bg-white/70 p-6 text-left shadow-sm backdrop-blur-sm"
          aria-live="polite"
        >
          <header className="mb-4 flex items-center gap-3">
            <div className="animate-pulse text-2xl" aria-hidden="true">
              📥
            </div>
            <h3 className="text-lg font-semibold text-secondary">
              Tu Ebook ya está acá (y algunas palabras antes de empezar)
            </h3>
          </header>

          <article className="space-y-3 text-sm leading-relaxed text-secondary">
            <p>
              Hola, gracias por estar acá. Si llegaste a este Ebook,
              probablemente no fue por curiosidad, sino porque estás atravesando
              una pérdida que duele.
            </p>

            <p>
              Quiero decirte algo antes de que lo abras: este no es un material
              para “hacer bien” ni para avanzar más rápido. Es un espacio para
              <span className="font-bold"> ordenar lo que sentís</span>, a tu
              ritmo, cuando tengas un poco de resto emocional.
            </p>

            <p>
              El Ebook que descargaste es{" "}
              <span className="font-bold">práctico y sencillo</span>. Tiene
              ejercicios de escritura pensados para ayudarte a poner en palabras
              lo que cuesta, y así atravesar este proceso con un poco más de
              claridad.
            </p>

            <p>
              No tiene tiempo estimado ni una frecuencia estructurada. Podés
              leer, cerrar y volver más tarde. Podés escribir mucho o apenas
              algunas líneas. Todo está bien.
            </p>

            <p>
              Si querés una sugerencia para empezar: buscá un momento tranquilo,
              leé la primera consigna y escribí sin pensar demasiado si “está
              bien” o no. Este espacio es solo para vos.
            </p>

            <footer className="flex flex-col pt-1 font-medium">
              Espero que este material pueda acompañarte, aunque sea un poco, en
              este momento. Y si hoy no es el día, también está bien volver
              cuando lo sientas.{" "}
              <span className="font-bold">Un abrazo, Sergio.</span>
            </footer>
          </article>
        </section>

        <p className="mb-8 text-lg text-secondary">ID de pago: {paymentId}</p>

        <Button
          size="lg"
          color="primary"
          onClick={() => handleDownload()}
          disabled={downloading}
          className="text-lg font-semibold"
        >
          {downloading ? "Descargando..." : "Descargar Ebook Nuevamente"}
        </Button>

        <p className="text-md mt-6 text-secondary">
          Si la descarga no inicia automáticamente, usa el botón de arriba.
        </p>
      </div>
    </div>
  );
}
