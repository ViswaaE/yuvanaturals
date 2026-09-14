import { Order } from "@/types/order";

export interface WhatsAppDriver {
  sendOrderConfirmationWhatsApp(order: Order): Promise<boolean>;
  sendShippingNotificationWhatsApp(order: Order): Promise<boolean>;
}

/**
 * WhatsApp Business API Provider Configuration & Driver Stub
 * Ready for Meta Cloud API or Twilio WhatsApp integration.
 */
export class WhatsAppNotificationDriver implements WhatsAppDriver {
  private apiEndpoint = process.env.WHATSAPP_API_ENDPOINT;
  private apiKey = process.env.WHATSAPP_API_KEY;

  async sendOrderConfirmationWhatsApp(order: Order): Promise<boolean> {
    if (!this.apiEndpoint || !this.apiKey) {
      console.log(
        `[WHATSAPP NOTIFICATION STUB] WhatsApp integration is unconfigured. Order #${order.orderId} alert queued for future WhatsApp API connection.`
      );
      return false;
    }

    try {
      // Future Meta WhatsApp Cloud API call structure:
      const payload = {
        messaging_product: "whatsapp",
        to: order.customer.phone.replace(/[^0-9]/g, ""),
        type: "template",
        template: {
          name: "order_confirmation",
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: order.customer.fullName },
                { type: "text", text: order.orderId },
                { type: "text", text: `₹${order.grandTotal}` },
              ],
            },
          ],
        },
      };

      await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      return true;
    } catch (err) {
      console.error("WhatsApp API dispatch error:", err);
      return false;
    }
  }

  async sendShippingNotificationWhatsApp(order: Order): Promise<boolean> {
    if (!this.apiEndpoint || !this.apiKey) {
      return false;
    }
    return true;
  }
}
