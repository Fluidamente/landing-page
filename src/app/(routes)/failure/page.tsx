import { Button } from "@nextui-org/react";
import { InfoCircle } from "iconsax-react";
import Link from "next/link";

export default function FailurePage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      style={{
        background:
          //change to error colors from danger 400 to danger 100
          "linear-gradient(0deg, rgba(255, 182, 193, 1) 0%, rgba(255, 228, 225, 1) 65%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      <div className="mb-6 flex justify-center text-6xl">
        <InfoCircle size="6rem" className="text-danger-600" />
      </div>
      <h2 className="mb-4 text-4xl font-bold text-danger-800">Pago Fallido</h2>
      <p className="text-lg text-danger-800">
        Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
      </p>
      <Link href="/#buy_ebook_section" className="mt-8">
        <Button size="lg" color="danger" className="text-lg font-semibold">
          Volver a Intentar
        </Button>
      </Link>
    </div>
  );
}
