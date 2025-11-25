import { NextResponse } from "next/server";
import { validatePayment, storePaymentInfo } from "@/lib/payment-validation";

export async function POST(req: Request) {
  const body = await req.json();

  // Check if it's a payment notification
  if (body.type === "payment" && body.data?.id) {
    const paymentId = body.data.id.toString();

    try {
      // Validate the payment with MercadoPago API
      const validation = await validatePayment(paymentId);

      // Store payment info for later verification
      storePaymentInfo(paymentId, validation.status);
    } catch (error) {
      console.error("Error processing webhook:", error);
      return NextResponse.json(
        { status: "error", message: "Failed to process payment" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ status: "ok" });
}
