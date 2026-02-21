import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { validatePayment, storePaymentInfo } from "@/lib/payment-validation";

const WEBHOOK_TOLERANCE_SECONDS = 300;
const WEBHOOK_DEBUG =
  process.env.NODE_ENV !== "production" ||
  process.env.MP_WEBHOOK_DEBUG === "true";

export async function GET() {
  const hasWebhookSecret = Boolean(process.env.MP_WEBHOOK_SECRET);

  return NextResponse.json(
    {
      status: "ok",
      service: "mercadopago-webhook",
      webhookSecretConfigured: hasWebhookSecret,
      timestamp: new Date().toISOString(),
    },
    { status: hasWebhookSecret ? 200 : 503 }
  );
}

function verifyMercadoPagoSignature(req: Request): {
  isValid: boolean;
  reason?: string;
} {
  const secret = process.env.MP_WEBHOOK_SECRET;
  const xSignature = req.headers.get("x-signature");
  const xRequestId = req.headers.get("x-request-id");

  if (!secret) {
    return { isValid: false, reason: "missing-webhook-secret" };
  }

  if (!xSignature || !xRequestId) {
    return { isValid: false, reason: "missing-signature-headers" };
  }

  const signatureParts = xSignature
    .split(",")
    .map((part) => part.trim().split("=", 2))
    .filter(([key, value]) => key && value);

  const parsedSignature = Object.fromEntries(signatureParts);
  const ts = parsedSignature.ts;
  const receivedHash = parsedSignature.v1;

  if (!ts || !receivedHash) {
    return { isValid: false, reason: "invalid-signature-format" };
  }

  const now = Math.floor(Date.now() / 1000);
  const timestamp = Number(ts);

  if (!Number.isFinite(timestamp)) {
    return { isValid: false, reason: "invalid-signature-timestamp" };
  }

  if (Math.abs(now - timestamp) > WEBHOOK_TOLERANCE_SECONDS) {
    return { isValid: false, reason: "stale-signature" };
  }

  const url = new URL(req.url);
  let dataId = url.searchParams.get("data.id") ?? "";

  if (dataId && /^[a-z0-9]+$/i.test(dataId)) {
    dataId = dataId.toLowerCase();
  }

  const manifestParts = [];

  if (dataId) {
    manifestParts.push(`id:${dataId}`);
  }

  manifestParts.push(`request-id:${xRequestId}`);
  manifestParts.push(`ts:${ts}`);

  const manifest = `${manifestParts.join(";")};`;

  const expectedHash = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");

  if (expectedHash.length !== receivedHash.length) {
    return { isValid: false, reason: "signature-length-mismatch" };
  }

  const encoder = new TextEncoder();
  const expectedHashBytes = encoder.encode(expectedHash);
  const receivedHashBytes = encoder.encode(receivedHash);

  const isValid = crypto.timingSafeEqual(expectedHashBytes, receivedHashBytes);

  return { isValid, reason: isValid ? undefined : "signature-mismatch" };
}

export async function POST(req: Request) {
  const signatureValidation = verifyMercadoPagoSignature(req);

  if (!signatureValidation.isValid) {
    if (WEBHOOK_DEBUG) {
      console.warn("[MP webhook] Signature validation failed", {
        reason: signatureValidation.reason,
        hasXSignature: Boolean(req.headers.get("x-signature")),
        hasXRequestId: Boolean(req.headers.get("x-request-id")),
        url: req.url,
      });
    }

    const statusCode =
      signatureValidation.reason === "missing-webhook-secret" ? 500 : 401;

    return NextResponse.json(
      {
        status: "error",
        message: "Invalid webhook signature",
      },
      { status: statusCode }
    );
  }

  if (WEBHOOK_DEBUG) {
    console.info("[MP webhook] Signature validation passed", { url: req.url });
  }

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
