import { Order, PaymentMethod } from "@/types/order";
import {
  PaymentInitiationResult,
  PaymentProvider,
  PaymentVerificationResult,
  VerifyPaymentRequest,
} from "@/types/payment";

export const YUVA_UPI_ID = "yuvanaturals@upi";
export const YUVA_ACCOUNT_NAME = "YUVA NATURALS";

export class ManualUPIProvider implements PaymentProvider {
  id = "manual_upi";
  name = "Manual UPI & QR Verification";

  async initiatePayment(order: Order): Promise<PaymentInitiationResult> {
    const note = encodeURIComponent(`Order ${order.orderId}`);
    const recipient = encodeURIComponent(YUVA_ACCOUNT_NAME);
    const amount = order.grandTotal.toFixed(2);
    
    // Official UPI Deep Link Standard format
    const upiDeepLink = `upi://pay?pa=${YUVA_UPI_ID}&pn=${recipient}&am=${amount}&tr=${order.orderId}&tn=${note}&cu=INR`;

    return {
      success: true,
      paymentMethod: "upi",
      upiId: YUVA_UPI_ID,
      upiDeepLink,
      qrPayload: upiDeepLink,
      instructions:
        "Scan the QR code or use the official UPI ID with any UPI App (Google Pay, PhonePe, Paytm, BHIM). After paying, submit your 12-digit UPI UTR / Transaction reference number.",
      requiresUtrSubmission: true,
    };
  }

  async verifyPayment(
    request: VerifyPaymentRequest,
    order: Order
  ): Promise<PaymentVerificationResult> {
    if (!request.utrNumber || request.utrNumber.trim().length < 6) {
      return {
        success: false,
        orderId: order.orderId,
        paymentStatus: "Verification Pending",
        message: "Please provide a valid 12-digit UPI UTR transaction reference number.",
        verifiedAt: new Date().toISOString(),
      };
    }

    // Manual Verification submits UTR for admin approval
    return {
      success: true,
      orderId: order.orderId,
      paymentStatus: "Verification Pending",
      message: "UTR submitted successfully. Your UPI payment is under admin verification.",
      verifiedAt: new Date().toISOString(),
    };
  }
}

/**
 * RazorpayProvider Stub Interface (For future seamless integration)
 * No credentials or active calls used now.
 */
export class RazorpayProvider implements PaymentProvider {
  id = "razorpay";
  name = "Razorpay Online Payments (UPI, Cards, Netbanking)";

  async initiatePayment(order: Order): Promise<PaymentInitiationResult> {
    throw new Error(
      "Razorpay integration is currently disabled. Please use Manual UPI or Cash on Delivery."
    );
  }

  async verifyPayment(
    request: VerifyPaymentRequest,
    order: Order
  ): Promise<PaymentVerificationResult> {
    throw new Error("Razorpay provider not configured.");
  }
}

/**
 * Factory function to retrieve appropriate payment provider
 */
export function getPaymentProvider(method: PaymentMethod): PaymentProvider {
  switch (method) {
    case "upi":
      return new ManualUPIProvider();
    default:
      return new ManualUPIProvider();
  }
}
