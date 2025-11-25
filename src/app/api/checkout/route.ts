import { NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  try {
    // Get the base URL from environment or request
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      `${request.headers.get("x-forwarded-proto") || "http"}://${request.headers.get("host")}`;

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: "ebook-001",
            title: "Ebook El camino consciente del duelo",
            quantity: 1,
            unit_price: 0.1,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: `localhost:3000/success`,
          failure: `localhost:3000/failure`,
          pending: `localhost:3000/pending`,
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ init_point: preference.init_point });
  } catch (error: any) {
    console.error("Error creating MercadoPago preference:", error);

    if (error.status === 403) {
      return NextResponse.json(
        {
          error:
            "Invalid MercadoPago credentials. Please check your access token has the correct permissions.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
