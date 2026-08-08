import { NextResponse } from "next/server";
import { validatePayment } from "@/lib/payment-validation";
import { sendEbookByEmail } from "@/lib/mail";
import { EBOOK_FILENAME, readEbookFile } from "@/lib/ebook-file";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const paymentId =
      typeof body?.payment_id === "string" ? body.payment_id : null;
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Ingresá un correo electrónico válido." },
        { status: 400 }
      );
    }

    const validation = await validatePayment(paymentId);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: "Payment not approved",
          status: validation.status,
          statusDetail: validation.statusDetail,
        },
        { status: 403 }
      );
    }

    let fileBuffer;
    try {
      fileBuffer = await readEbookFile();
    } catch (fileError) {
      console.error("Error reading ebook file:", fileError);
      return NextResponse.json(
        { error: "Ebook file not found" },
        { status: 404 }
      );
    }

    const result = await sendEbookByEmail({
      to: email,
      attachment: fileBuffer,
      filename: EBOOK_FILENAME,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "No pudimos enviar el correo. Intentá nuevamente." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending ebook email:", error);
    return NextResponse.json(
      { error: "Failed to send ebook email" },
      { status: 500 }
    );
  }
}
