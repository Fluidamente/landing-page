export default function PendingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-yellow-100">
      <h1 className="mb-4 text-4xl font-bold text-yellow-800">
        Pago Pendiente
      </h1>
      <p className="text-lg text-yellow-700">
        Tu pago está en proceso. Te notificaremos una vez que se haya
        completado.
      </p>
    </div>
  );
}
