import { NextResponse } from "next/server";
import { validatePayment, getPaymentInfo } from "@/lib/payment-validation";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("payment_id");

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    // Validate payment with MercadoPago
    const validation = await validatePayment(paymentId);

    // Check if payment was already processed via webhook
    const storedPayment = getPaymentInfo(paymentId);

    return NextResponse.json({
      ...validation,
      alreadyProcessed: !!storedPayment,
      downloaded: storedPayment?.downloaded || false,
    });
  } catch (error) {
    console.error("Error validating payment:", error);
    return NextResponse.json(
      { error: "Failed to validate payment" },
      { status: 500 }
    );
  }
}
