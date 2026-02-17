import MercadoPagoConfig, { Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export interface PaymentValidationResult {
  isValid: boolean;
  status: string;
  statusDetail: string;
  amount: number;
  paymentId: string;
}

/**
 * Validates a MercadoPago payment by ID
 */
export async function validatePayment(
  paymentId: string
): Promise<PaymentValidationResult> {
  try {
    const payment = new Payment(client);
    const paymentData = await payment.get({ id: paymentId });

    return {
      isValid: paymentData.status === "approved",
      status: paymentData.status || "unknown",
      statusDetail: paymentData.status_detail || "unknown",
      amount: paymentData.transaction_amount || 0,
      paymentId: paymentData.id?.toString() || "",
    };
  } catch (error) {
    console.error("Error validating payment:", error);
    throw new Error("Failed to validate payment");
  }
}

/**
 * Stores payment information in a simple in-memory store
 * In production, use a database like PostgreSQL, MongoDB, etc.
 */
const paymentStore = new Map<
  string,
  {
    paymentId: string;
    status: string;
    timestamp: number;
    downloaded: boolean;
    downloadToken?: string;
    tokenExpiry?: number;
  }
>();

export function storePaymentInfo(paymentId: string, status: string) {
  paymentStore.set(paymentId, {
    paymentId,
    status,
    timestamp: Date.now(),
    downloaded: false,
  });
}

export function getPaymentInfo(paymentId: string) {
  return paymentStore.get(paymentId);
}

export function markAsDownloaded(paymentId: string) {
  const payment = paymentStore.get(paymentId);
  if (payment) {
    payment.downloaded = true;
    paymentStore.set(paymentId, payment);
  }
}

/**
 * Generate a secure one-time download token
 */
export function generateDownloadToken(paymentId: string): string {
  const token = `${paymentId}_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  const payment = paymentStore.get(paymentId);

  if (payment) {
    payment.downloadToken = token;
    payment.tokenExpiry = Date.now() + 3600000; // 1 hour expiry
    paymentStore.set(paymentId, payment);
  }

  return token;
}

/**
 * Validate download token and invalidate after use (one-time use)
 */
export function validateDownloadToken(token: string): boolean {
  const entries = Array.from(paymentStore.entries());
  for (const [paymentId, payment] of entries) {
    if (payment.downloadToken === token) {
      if (payment.tokenExpiry && payment.tokenExpiry > Date.now()) {
        // Invalidate the token after successful validation (one-time use)
        paymentStore.set(paymentId, {
          ...payment,
          downloadToken: undefined,
          tokenExpiry: undefined,
        });
        return true;
      }
    }
  }
  return false;
}
