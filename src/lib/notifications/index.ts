import { StandardEmailDriver } from "./email-driver";
import { WhatsAppNotificationDriver } from "./whatsapp-driver";
import { Order } from "@/types/order";

export class NotificationService {
  private emailDriver = new StandardEmailDriver();
  private whatsAppDriver = new WhatsAppNotificationDriver();

  async notifyNewOrder(order: Order): Promise<void> {
    await this.emailDriver.sendNewOrderEmail(order);
    await this.whatsAppDriver.sendOrderConfirmationWhatsApp(order);
  }

  async notifyPaymentVerified(order: Order): Promise<void> {
    await this.emailDriver.sendPaymentVerifiedEmail(order);
  }

  async notifyOrderShipped(order: Order): Promise<void> {
    await this.emailDriver.sendOrderShippedEmail(order);
    await this.whatsAppDriver.sendShippingNotificationWhatsApp(order);
  }

  async notifyOrderDelivered(order: Order): Promise<void> {
    await this.emailDriver.sendOrderDeliveredEmail(order);
  }

  async notifyOrderCancelled(order: Order): Promise<void> {
    await this.emailDriver.sendOrderCancelledEmail(order);
  }
}

export const notificationService = new NotificationService();
