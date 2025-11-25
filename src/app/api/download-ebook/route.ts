import { NextResponse } from "next/server";
import { validatePayment, markAsDownloaded } from "@/lib/payment-validation";
import { readFile } from "fs/promises";
import path from "path";

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

    // Validate the payment
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

    // Mark payment as downloaded
    markAsDownloaded(paymentId);

    // Path to the ebook file in the public folder
    const filePath = path.join(
      process.cwd(),
      "public",
      "ebooks",
      "el_camino_consciente_del_duelo.pdf"
    );

    try {
      // Read the file
      const fileBuffer = await readFile(filePath);

      // Return the file as a download
      return new NextResponse(fileBuffer as any, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition":
            'attachment; filename="el_camino_consciente_del_duelo.pdf"',
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
