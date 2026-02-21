import { NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const configuredBaseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();
    const requestOrigin = new URL(request.url).origin;

    const rawBaseUrl = configuredBaseUrl || requestOrigin;
    const baseUrlWithProtocol = /^https?:\/\//i.test(rawBaseUrl)
      ? rawBaseUrl
      : `${rawBaseUrl.startsWith("localhost") ? "http" : "https"}://${rawBaseUrl}`;

    const origin = new URL(baseUrlWithProtocol).origin;
    const successUrl = new URL("/success", origin).toString();
    const failureUrl = new URL("/failure", origin).toString();
    const pendingUrl = new URL("/pending", origin).toString();
    const isLocalOrigin = /https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(
      origin
    );
    const shouldUseAutoReturn =
      successUrl.startsWith("https://") && !isLocalOrigin;

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
          success: successUrl,
          failure: failureUrl,
          pending: pendingUrl,
        },
        redirect_urls: {
          success: successUrl,
          failure: failureUrl,
          pending: pendingUrl,
        },
        ...(shouldUseAutoReturn ? { auto_return: "approved" } : {}),
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
