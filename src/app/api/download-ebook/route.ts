import { NextResponse } from "next/server";
import { validatePayment, markAsDownloaded } from "@/lib/payment-validation";
import { EBOOK_FILENAME, readEbookFile } from "@/lib/ebook-file";

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

    markAsDownloaded(paymentId);

    try {
      const fileBuffer = await readEbookFile();

      return new NextResponse(fileBuffer as any, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${EBOOK_FILENAME}"`,
          "Content-Length": fileBuffer.length.toString(),
        },
      });
    } catch (fileError) {
      console.error("Error reading ebook file:", fileError);
      return NextResponse.json(
        { error: "Ebook file not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error downloading ebook:", error);
    return NextResponse.json(
      { error: "Failed to download ebook" },
      { status: 500 }
    );
  }
}
