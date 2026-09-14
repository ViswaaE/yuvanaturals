export type OrderStatus =
  | "Pending Payment"
  | "Payment Verification Pending"
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Refunded";

export type PaymentStatus =
  | "Pending"
  | "Verification Pending"
  | "Paid"
  | "Failed"
  | "COD Pending"
  | "Refunded";

export type PaymentMethod = "upi" | "cod";

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

export interface Order {
  orderId: string; // e.g. YN-10001
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  couponCode?: string;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  utrNumber?: string | null;
  trackingNumber?: string | null;
  courierName?: string | null;
  adminNotes?: string | null;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}

export interface CreateOrderRequest {
  customer: CustomerDetails;
  items: Array<{ productId: string; quantity: number }>;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  utrNumber?: string;
}

export interface UpdateOrderRequest {
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
  utrNumber?: string;
  trackingNumber?: string;
  courierName?: string;
  adminNotes?: string;
}
