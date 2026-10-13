/**
 * YUVA NATURALS — WhatsApp Ordering Utilities
 *
 * Pure functions for building WhatsApp enquiry messages and opening wa.me links.
 * Never sends messages automatically — the customer must tap Send in WhatsApp.
 */

import type { CartItem } from "@/context/cart-context";
import type { Product } from "@/types/product";
import { WHATSAPP_BUSINESS_NUMBER, WHATSAPP_BUSINESS_NAME } from "@/constants/whatsapp";

/** Optional customer details collected before opening WhatsApp */
export interface CustomerDetails {
  name: string;
  mobile: string;
  address?: string;
  pincode?: string;
  deliveryNote?: string;
}

/** Separator line used in the message */
const HR = "────────────────";

/**
 * Build a full cart enquiry message in plain text.
 * Product names, quantities, prices, and totals are taken from live cart data.
 */
export function buildCartWhatsAppMessage(
  cart: CartItem[],
  rawSubtotal: number,
  customer?: CustomerDetails
): string {
  const lines: string[] = [];

  lines.push(`🌿 ${WHATSAPP_BUSINESS_NAME} — NEW ORDER ENQUIRY`);
  lines.push("");
  lines.push(`Hello ${WHATSAPP_BUSINESS_NAME}! I would like to order these products:`);
  lines.push("");

  cart.forEach(({ product, quantity }, index) => {
    const subtotal = product.price * quantity;
    lines.push(`${index + 1}. ${product.name}`);
    lines.push(`   Quantity: ${quantity}`);
    lines.push(`   Price: ₹${product.price} each`);
    lines.push(`   Subtotal: ₹${subtotal}`);
    lines.push("");
  });

  lines.push(HR);
  lines.push(`Items Total: ₹${rawSubtotal}`);
  lines.push("Shipping: To be confirmed");
  lines.push(`Grand Total: ₹${rawSubtotal} + shipping, if applicable`);

  if (customer && (customer.name || customer.mobile)) {
    lines.push("");
    lines.push("👤 Customer Details");
    if (customer.name) lines.push(`Name: ${customer.name}`);
    if (customer.mobile) lines.push(`Mobile: ${customer.mobile}`);
    if (customer.address) lines.push(`Address: ${customer.address}`);
    if (customer.pincode) lines.push(`Pincode: ${customer.pincode}`);
    if (customer.deliveryNote) lines.push(`Delivery Note: ${customer.deliveryNote}`);
  }

  lines.push("");
  lines.push(
    "Please confirm product availability, delivery charges and the final payable amount. Thank you!"
  );

  return lines.join("\n");
}

/**
 * Build a single-product enquiry message (from product detail page).
 */
export function buildProductWhatsAppMessage(
  product: Product,
  quantity: number,
  pageUrl?: string
): string {
  const subtotal = product.price * quantity;
  const lines: string[] = [];

  lines.push(`🌿 ${WHATSAPP_BUSINESS_NAME} — PRODUCT ENQUIRY`);
  lines.push("");
  lines.push(`Hello ${WHATSAPP_BUSINESS_NAME}! I am interested in ordering:`);
  lines.push("");
  lines.push(`📦 Product: ${product.name}`);
  lines.push(`   Category: ${product.category}`);
  if (product.size) lines.push(`   Size/Weight: ${product.size}`);
  lines.push(`   Quantity: ${quantity}`);
  lines.push(`   Price: ₹${product.price} each`);
  lines.push(`   Subtotal: ₹${subtotal}`);
  if (pageUrl) lines.push(`   Product Link: ${pageUrl}`);
  lines.push("");
  lines.push(HR);
  lines.push(`Items Total: ₹${subtotal}`);
  lines.push("Shipping: To be confirmed");
  lines.push(`Grand Total: ₹${subtotal} + shipping, if applicable`);
  lines.push("");
  lines.push(
    "Please confirm availability, delivery charges and the final payable amount. Thank you!"
  );

  return lines.join("\n");
}

/**
 * URL-encode the message and open the wa.me click-to-chat link.
 * Works on mobile (opens WhatsApp app) and desktop (opens WhatsApp Web).
 */
export function openWhatsApp(message: string): void {
  if (typeof window === "undefined") return;
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
