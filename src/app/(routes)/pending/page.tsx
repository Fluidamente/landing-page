import { Button } from "@nextui-org/react";
import { MoreCircle } from "iconsax-react";
import Link from "next/link";

export default function PendingPage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center "
      style={{
        background:
          "linear-gradient(0deg, rgba(255, 223, 186, 1) 0%, rgba(255, 249, 230, 1) 65%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      <div className="mb-6 flex justify-center text-6xl">
        <MoreCircle size="6rem" className="text-warning" />
      </div>
      <h2 className="mb-4 text-4xl font-bold text-warning-700">
        Pago Pendiente
      </h2>
      <p className="text-lg text-warning-800">
        Tu pago está en proceso. Te notificaremos una vez que se haya
        completado.
      </p>
      <Link href="/" className="mt-8">
        <Button size="lg" color="warning" className="text-lg font-semibold">
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
}
