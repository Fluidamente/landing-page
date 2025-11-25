"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
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
            handleDownload();
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Error validating payment:", error);
    } finally {
      setIsValidating(false);
    }
  };

  const handleDownload = async () => {
    if (!paymentId) return;

    setDownloading(true);
    try {
      const response = await fetch(
        `/api/download-ebook?payment_id=${paymentId}`
      );

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
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-100 p-8">
      <div className="max-w-2xl text-center">
        <div className="mb-6 text-6xl">✅</div>
        <h1 className="mb-4 text-4xl font-bold text-green-800">
          ¡Compra Exitosa!
        </h1>
        <p className="mb-6 text-lg text-green-700">
          Gracias por tu compra. Tu transacción ha sido procesada con éxito.
        </p>

        {downloading && (
          <div className="mb-6">
            <div className="mb-2 animate-pulse text-2xl">📥</div>
            <p className="font-semibold text-green-600">
              Tu ebook se está descargando automáticamente...
            </p>
          </div>
        )}

        <p className="text-md mb-8 text-green-600">ID de pago: {paymentId}</p>

        <Button
          size="lg"
          color="success"
          onClick={handleDownload}
          disabled={downloading}
          className="text-lg font-semibold"
        >
          {downloading ? "Descargando..." : "Descargar Ebook Nuevamente"}
        </Button>

        <p className="mt-6 text-sm text-green-600">
          Si la descarga no inicia automáticamente, usa el botón de arriba.
        </p>
      </div>
    </div>
  );
}
