export default function FailurePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-100">
      <h1 className="mb-4 text-4xl font-bold text-red-800">Pago Fallido</h1>
      <p className="text-lg text-red-700">
        Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
      </p>
    </div>
  );
}
