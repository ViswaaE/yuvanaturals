import { Order } from "@/types/order";

const BRAND_NAME = "YUVA NATURALS";
const BRAND_TAGLINE = "Nature's Touch, Radiant Glow";
const BRAND_COLOR = "#1A3C2F";
const GOLD_COLOR = "#C5A059";
const BG_COLOR = "#FAF7F2";

function renderHeader(title: string): string {
  return `
    <div style="background-color: ${BRAND_COLOR}; padding: 30px 20px; text-align: center; color: #FAF7F2;">
      <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; letter-spacing: 1px; color: #FAF7F2;">${BRAND_NAME}</h1>
      <p style="margin: 5px 0 0 0; font-size: 11px; text-transform: uppercase; tracking: 2px; color: ${GOLD_COLOR};">${BRAND_TAGLINE}</p>
      <h2 style="margin: 20px 0 0 0; font-size: 18px; font-weight: normal; color: #FAF7F2; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">${title}</h2>
    </div>
  `;
}

function renderFooter(): string {
  return `
    <div style="background-color: ${BG_COLOR}; padding: 25px 20px; text-align: center; border-top: 1px solid #E5DFD5; font-size: 12px; color: #556B61;">
      <p style="margin: 0 0 8px 0; font-weight: bold; color: ${BRAND_COLOR};">${BRAND_NAME} — Handcrafted Botanical Care</p>
      <p style="margin: 0 0 8px 0;">Need assistance? Contact support at <a href="mailto:support@yuvanaturals.com" style="color: ${BRAND_COLOR}; font-weight: bold;">support@yuvanaturals.com</a></p>
      <p style="margin: 0; font-size: 10px; color: #7C907C;">© ${new Date().getFullYear()} YUVA NATURALS. All rights reserved.</p>
    </div>
  `;
}

function renderOrderItemsTable(order: Order): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #E5DFD5; font-size: 13px; color: #1A3C2F;">
        <strong>${item.name}</strong><br/>
        <span style="font-size: 11px; color: #7C907C;">Qty: ${item.quantity} | ${item.size}</span>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #E5DFD5; font-size: 13px; color: #1A3C2F; text-align: right; font-weight: bold;">
        ₹${item.price * item.quantity}
      </td>
    </tr>
  `
    )
    .join("");

  return `
    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
      <thead>
        <tr style="background-color: #F3EDE4; text-align: left;">
          <th style="padding: 10px; font-size: 11px; text-transform: uppercase; color: ${BRAND_COLOR};">Item</th>
          <th style="padding: 10px; font-size: 11px; text-transform: uppercase; color: ${BRAND_COLOR}; text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>
    <div style="margin-top: 15px; border-top: 1px solid #1A3C2F; padding-top: 10px; text-align: right; font-size: 13px; color: #1A3C2F;">
      <p style="margin: 3px 0;">Subtotal: <strong>₹${order.subtotal}</strong></p>
      ${order.discount > 0 ? `<p style="margin: 3px 0; color: #10B981;">Discount: <strong>-₹${order.discount}</strong></p>` : ""}
      <p style="margin: 3px 0;">Shipping: <strong>${order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</strong></p>
      <p style="margin: 8px 0 0 0; font-size: 16px; font-weight: bold; color: ${GOLD_COLOR};">Grand Total: ₹${order.grandTotal}</p>
    </div>
  `;
}

export function templateNewOrderCustomer(order: Order): { subject: string; html: string } {
  return {
    subject: `Order Received #${order.orderId} - ${BRAND_NAME}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5DFD5;">
        ${renderHeader("Order Confirmation")}
        <div style="padding: 25px; background-color: #ffffff;">
          <p style="font-size: 14px; color: #1A3C2F;">Dear <strong>${order.customer.fullName}</strong>,</p>
          <p style="font-size: 13px; color: #556B61; line-height: 1.5;">
            Thank you for choosing YUVA NATURALS. We have received your order <strong>#${order.orderId}</strong>.
          </p>

          ${
            order.paymentMethod === "upi"
              ? `
            <div style="background-color: #FFFBEB; border: 1px solid #FCD34D; padding: 15px; margin: 20px 0; font-size: 13px; color: #92400E;">
              <strong>UPI Payment Status: Verification Pending</strong><br/>
              Submitted UTR: <code style="background:#FEF3C7; padding:2px 6px;">${order.utrNumber || "Submitted"}</code><br/>
              Our team will verify your payment within 1–2 hours. Your order status will automatically update to <strong>Confirmed</strong> upon verification.
            </div>
          `
              : `
            <div style="background-color: #ECFDF5; border: 1px solid #6EE7B7; padding: 15px; margin: 20px 0; font-size: 13px; color: #065F46;">
              <strong>Cash on Delivery (COD) Confirmed</strong><br/>
              Your order is confirmed. Please keep ₹${order.grandTotal} ready for cash payment upon delivery.
            </div>
          `
          }

          <h3 style="font-family: Georgia, serif; color: ${BRAND_COLOR}; margin-top: 25px;">Order Details</h3>
          ${renderOrderItemsTable(order)}

          <div style="margin-top: 25px; padding: 15px; background-color: ${BG_COLOR}; border: 1px solid #E5DFD5;">
            <h4 style="margin: 0 0 8px 0; color: ${BRAND_COLOR}; font-size: 12px; text-transform: uppercase;">Shipping Address</h4>
            <p style="margin: 0; font-size: 13px; color: #556B61; line-height: 1.4;">
              ${order.customer.fullName}<br/>
              ${order.customer.addressLine1}<br/>
              ${order.customer.addressLine2 ? `${order.customer.addressLine2}<br/>` : ""}
              ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}<br/>
              Phone: ${order.customer.phone}
            </p>
          </div>
        </div>
        ${renderFooter()}
      </div>
    `,
  };
}

export function templateNewOrderAdmin(order: Order): { subject: string; html: string } {
  return {
    subject: `🚨 [NEW ORDER] #${order.orderId} - ₹${order.grandTotal} (${order.paymentMethod.toUpperCase()})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1A3C2F;">
        ${renderHeader("Admin Order Alert")}
        <div style="padding: 25px; background-color: #ffffff;">
          <p style="font-size: 14px; color: #1A3C2F;">A new order <strong>#${order.orderId}</strong> was placed by <strong>${order.customer.fullName}</strong>.</p>
          
          <p style="font-size: 13px; color: #556B61;">
            Payment Method: <strong>${order.paymentMethod.toUpperCase()}</strong><br/>
            Payment Status: <strong>${order.paymentStatus}</strong><br/>
            ${order.utrNumber ? `UTR Reference Number: <strong style="color:#C5A059;">${order.utrNumber}</strong>` : ""}
          </p>

          ${renderOrderItemsTable(order)}
        </div>
        ${renderFooter()}
      </div>
    `,
  };
}

export function templatePaymentVerified(order: Order): { subject: string; html: string } {
  return {
    subject: `Payment Verified! Order #${order.orderId} Confirmed - ${BRAND_NAME}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5DFD5;">
        ${renderHeader("Payment Verification Successful")}
        <div style="padding: 25px; background-color: #ffffff;">
          <p style="font-size: 14px; color: #1A3C2F;">Dear <strong>${order.customer.fullName}</strong>,</p>
          <div style="background-color: #ECFDF5; border: 1px solid #6EE7B7; padding: 15px; margin: 15px 0; font-size: 13px; color: #065F46;">
            🎉 Great news! Your UPI payment (UTR: <strong>${order.utrNumber || "Verified"}</strong>) of <strong>₹${order.grandTotal}</strong> has been successfully verified!
          </div>
          <p style="font-size: 13px; color: #556B61;">
            Your order status is now <strong style="color:#1A3C2F;">Confirmed</strong>. Our artisans are handcrafting and curing your products for dispatch.
          </p>
        </div>
        ${renderFooter()}
      </div>
    `,
  };
}

export function templateOrderShipped(order: Order): { subject: string; html: string } {
  return {
    subject: `Your Order #${order.orderId} Has Been Shipped! - ${BRAND_NAME}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5DFD5;">
        ${renderHeader("Order Shipped")}
        <div style="padding: 25px; background-color: #ffffff;">
          <p style="font-size: 14px; color: #1A3C2F;">Dear <strong>${order.customer.fullName}</strong>,</p>
          <p style="font-size: 13px; color: #556B61;">
            Your YUVA NATURALS package for order <strong>#${order.orderId}</strong> is on its way!
          </p>

          <div style="background-color: ${BG_COLOR}; border: 1px solid #C5A059; padding: 15px; margin: 20px 0; font-size: 13px; color: #1A3C2F;">
            Courier Service: <strong>${order.courierName || "Express Surface Courier"}</strong><br/>
            Tracking AWB Number: <strong style="font-family: monospace; font-size: 14px; color: ${GOLD_COLOR};">${order.trackingNumber || "N/A"}</strong>
          </div>

          ${renderOrderItemsTable(order)}
        </div>
        ${renderFooter()}
      </div>
    `,
  };
}

export function templateOrderDelivered(order: Order): { subject: string; html: string } {
  return {
    subject: `Order #${order.orderId} Delivered - ${BRAND_NAME}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5DFD5;">
        ${renderHeader("Order Delivered")}
        <div style="padding: 25px; background-color: #ffffff;">
          <p style="font-size: 14px; color: #1A3C2F;">Dear <strong>${order.customer.fullName}</strong>,</p>
          <p style="font-size: 13px; color: #556B61;">
            Your order <strong>#${order.orderId}</strong> has been successfully delivered to your shipping address.
          </p>
          <p style="font-size: 13px; color: #556B61;">
            We hope you love your botanical skincare and natural treats. Thank you for supporting handcrafted Ayurvedic care!
          </p>
        </div>
        ${renderFooter()}
      </div>
    `,
  };
}

export function templateOrderCancelled(order: Order): { subject: string; html: string } {
  return {
    subject: `Order #${order.orderId} Update: Cancelled - ${BRAND_NAME}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5DFD5;">
        ${renderHeader("Order Cancellation Notice")}
        <div style="padding: 25px; background-color: #ffffff;">
          <p style="font-size: 14px; color: #1A3C2F;">Dear <strong>${order.customer.fullName}</strong>,</p>
          <p style="font-size: 13px; color: #556B61;">
            Your order <strong>#${order.orderId}</strong> has been cancelled. If you believe this was an error or if you require a refund, please contact support.
          </p>
        </div>
        ${renderFooter()}
      </div>
    `,
  };
}
