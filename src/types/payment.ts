import { Order, PaymentMethod, PaymentStatus } from "./order";

export interface PaymentInitiationResult {
  success: boolean;
  paymentMethod: PaymentMethod;
  upiId?: string;
  upiDeepLink?: string;
  qrPayload?: string;
  instructions: string;
  requiresUtrSubmission: boolean;
  redirectUrl?: string;
  gatewayOrderId?: string;
}

export interface VerifyPaymentRequest {
  orderId: string;
  utrNumber?: string;
  gatewayPaymentId?: string;
  gatewaySignature?: string;
}

export interface PaymentVerificationResult {
  success: boolean;
  orderId: string;
  paymentStatus: PaymentStatus;
  message: string;
  verifiedAt: string;
}

export interface PaymentProvider {
  id: string;
  name: string;
  initiatePayment(order: Order): Promise<PaymentInitiationResult>;
  verifyPayment(request: VerifyPaymentRequest, order: Order): Promise<PaymentVerificationResult>;
}
