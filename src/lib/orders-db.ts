import fs from "fs";
import path from "path";
import { products } from "@/constants/products";
import {
  CreateOrderRequest,
  Order,
  OrderItem,
  OrderStatus,
  PaymentStatus,
  UpdateOrderRequest,
} from "@/types/order";
import { notificationService } from "./notifications";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

// Ensure data directory and initial orders.json file exist
function ensureStorageExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    const seedOrders: Order[] = [
      {
        orderId: "YN-10001",
        customer: {
          fullName: "Aarav Sharma",
          email: "aarav.sharma@example.com",
          phone: "+91 98765 12345",
          addressLine1: "42 Heritage Enclave, Lotus Road",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560001",
        },
        items: [
          {
            productId: "yuva-001",
            slug: "premium-pure-goat-milk-lavender-bath-bar",
            name: "Premium Pure Goat Milk with Lavender Essential Oil Bath Bar",
            price: 180,
            quantity: 2,
            size: "125g / 4.4 oz",
            image: "/api/images/goat_milk_lavender_bar",
          },
          {
            productId: "yuva-006",
            slug: "traditional-thinai-millet-cookies",
            name: "Traditional Thinai (Foxtail Millet) Artisan Cookies",
            price: 240,
            quantity: 1,
            size: "300g Net Wt.",
            image: "/api/images/thinai_cookies",
          },
        ],
        subtotal: 600,
        shipping: 0,
        discount: 90,
        couponCode: "YUVA15",
        grandTotal: 510,
        paymentMethod: "upi",
        paymentStatus: "Verification Pending",
        orderStatus: "Payment Verification Pending",
        utrNumber: "987654321012",
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        orderId: "YN-10002",
        customer: {
          fullName: "Priya Sundaram",
          email: "priya.s@example.com",
          phone: "+91 98123 45678",
          addressLine1: "15 Temple View Street",
          city: "Chennai",
          state: "Tamil Nadu",
          pincode: "600004",
        },
        items: [
          {
            productId: "yuva-002",
            slug: "manjishtha-licorice-goat-milk-bath-bar",
            name: "Manjishtha & Licorice Root Goat Milk Bath Bar",
            price: 195,
            quantity: 1,
            size: "125g / 4.4 oz",
            image: "/api/images/manjishtha_bath_bar",
          },
          {
            productId: "yuva-003",
            slug: "hibiscus-bhringraj-hair-nourishing-shampoo",
            name: "Hibiscus & Bhringraj Hair Growth & Shine Shampoo",
            price: 340,
            quantity: 1,
            size: "250ml",
            image: "/api/images/hibiscus_shampoo",
          },
        ],
        subtotal: 535,
        shipping: 0,
        discount: 0,
        grandTotal: 535,
        paymentMethod: "cod",
        paymentStatus: "COD Pending",
        orderStatus: "Confirmed",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ];
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(seedOrders, null, 2), "utf-8");
  }
}

// Read orders safely from JSON file
function readOrders(): Order[] {
  ensureStorageExists();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
    return JSON.parse(raw) as Order[];
  } catch (error) {
    console.error("Error reading orders database file:", error);
    return [];
  }
}

// Write orders atomically to JSON file
function writeOrders(orders: Order[]): void {
  ensureStorageExists();
  const tempPath = `${ORDERS_FILE}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(orders, null, 2), "utf-8");
  fs.renameSync(tempPath, ORDERS_FILE);
}

/**
 * Generate sequential unique Order ID (e.g. YN-10003)
 */
function generateNextOrderId(existingOrders: Order[]): string {
  let maxId = 10000;
  for (const order of existingOrders) {
    const match = order.orderId.match(/^YN-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxId) {
        maxId = num;
      }
    }
  }
  return `YN-${maxId + 1}`;
}

export const ordersDb = {
  // Fetch all orders sorted by newest first
  getAllOrders(): Order[] {
    const orders = readOrders();
    return orders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  // Fetch single order by Order ID
  getOrderById(orderId: string): Order | null {
    const orders = readOrders();
    return orders.find((o) => o.orderId.toLowerCase() === orderId.toLowerCase()) || null;
  },

  // Create new order with strict server-side price recalculations & security checks
  async createOrder(payload: CreateOrderRequest): Promise<Order> {
    const { customer, items: rawItems, paymentMethod, couponCode, utrNumber } = payload;

    // 1. Customer Details Server-Side Validation
    if (
      !customer ||
      !customer.fullName?.trim() ||
      !customer.email?.trim() ||
      !customer.phone?.trim() ||
      !customer.addressLine1?.trim() ||
      !customer.city?.trim() ||
      !customer.state?.trim() ||
      !customer.pincode?.trim()
    ) {
      throw new Error("Missing required customer shipping information.");
    }

    if (!rawItems || rawItems.length === 0) {
      throw new Error("Cannot create order with an empty shopping bag.");
    }

    // 2. Server-side price recalculation (Never trust browser prices!)
    const validatedItems: OrderItem[] = [];
    let subtotal = 0;

    for (const rawItem of rawItems) {
      const targetProduct = products.find((p) => p.id === rawItem.productId);
      if (!targetProduct) {
        throw new Error(`Product with ID '${rawItem.productId}' not found in catalog.`);
      }

      const quantity = Math.max(1, Math.floor(rawItem.quantity || 1));
      const linePrice = targetProduct.price * quantity;
      subtotal += linePrice;

      validatedItems.push({
        productId: targetProduct.id,
        slug: targetProduct.slug,
        name: targetProduct.name,
        price: targetProduct.price,
        quantity,
        size: targetProduct.size,
        image: targetProduct.image,
      });
    }

    // 3. Discount calculation (YUVA15 gives 15% discount)
    let discount = 0;
    const cleanCoupon = couponCode?.toUpperCase().trim();
    if (cleanCoupon === "YUVA15") {
      discount = Math.round(subtotal * 0.15);
    }

    // 4. Shipping cost calculation (FREE on orders >= ₹500, else ₹60)
    const netSubtotal = subtotal - discount;
    const shipping = netSubtotal >= 500 ? 0 : 60;
    const grandTotal = netSubtotal + shipping;

    // 5. Initial Payment & Order Status setup
    let paymentStatus: PaymentStatus = "Pending";
    let orderStatus: OrderStatus = "Pending Payment";

    if (paymentMethod === "upi") {
      paymentStatus = "Verification Pending";
      orderStatus = "Payment Verification Pending";
    } else if (paymentMethod === "cod") {
      paymentStatus = "COD Pending";
      orderStatus = "Confirmed";
    }

    const orders = readOrders();
    const newOrderId = generateNextOrderId(orders);
    const now = new Date().toISOString();

    const newOrder: Order = {
      orderId: newOrderId,
      customer: {
        fullName: customer.fullName.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
        addressLine1: customer.addressLine1.trim(),
        addressLine2: customer.addressLine2?.trim() || "",
        city: customer.city.trim(),
        state: customer.state.trim(),
        pincode: customer.pincode.trim(),
      },
      items: validatedItems,
      subtotal,
      shipping,
      discount,
      couponCode: cleanCoupon || undefined,
      grandTotal,
      paymentMethod,
      paymentStatus,
      orderStatus,
      utrNumber: utrNumber?.trim() || null,
      createdAt: now,
      updatedAt: now,
    };

    orders.push(newOrder);
    writeOrders(orders);

    // Trigger async notifications
    try {
      await notificationService.notifyNewOrder(newOrder);
    } catch (err) {
      console.error("Error triggering new order notification:", err);
    }

    return newOrder;
  },

  // Update order status or payment verification status
  async updateOrder(orderId: string, updates: UpdateOrderRequest): Promise<Order> {
    const orders = readOrders();
    const index = orders.findIndex((o) => o.orderId.toLowerCase() === orderId.toLowerCase());

    if (index === -1) {
      throw new Error(`Order '${orderId}' not found.`);
    }

    const currentOrder = orders[index];
    const prevPaymentStatus = currentOrder.paymentStatus;
    const prevOrderStatus = currentOrder.orderStatus;

    // Apply updates
    if (updates.paymentStatus) currentOrder.paymentStatus = updates.paymentStatus;
    if (updates.orderStatus) currentOrder.orderStatus = updates.orderStatus;
    if (updates.utrNumber !== undefined) currentOrder.utrNumber = updates.utrNumber;
    if (updates.trackingNumber !== undefined)
      currentOrder.trackingNumber = updates.trackingNumber;
    if (updates.courierName !== undefined) currentOrder.courierName = updates.courierName;
    if (updates.adminNotes !== undefined) currentOrder.adminNotes = updates.adminNotes;

    currentOrder.updatedAt = new Date().toISOString();
    orders[index] = currentOrder;
    writeOrders(orders);

    // Notification Triggers based on status transitions
    try {
      // Payment Verified trigger
      if (prevPaymentStatus !== "Paid" && currentOrder.paymentStatus === "Paid") {
        await notificationService.notifyPaymentVerified(currentOrder);
      }

      // Shipped trigger
      if (prevOrderStatus !== "Shipped" && currentOrder.orderStatus === "Shipped") {
        await notificationService.notifyOrderShipped(currentOrder);
      }

      // Delivered trigger
      if (prevOrderStatus !== "Delivered" && currentOrder.orderStatus === "Delivered") {
        await notificationService.notifyOrderDelivered(currentOrder);
      }

      // Cancelled trigger
      if (prevOrderStatus !== "Cancelled" && currentOrder.orderStatus === "Cancelled") {
        await notificationService.notifyOrderCancelled(currentOrder);
      }
    } catch (err) {
      console.error("Error sending order status change notification:", err);
    }

    return currentOrder;
  },
};
