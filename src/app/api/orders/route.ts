import { NextResponse } from "next/server";
import { ordersDb } from "@/lib/orders-db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const paymentStatus = searchParams.get("paymentStatus");
    const orderStatus = searchParams.get("orderStatus");

    let orders = ordersDb.getAllOrders();

    if (search) {
      const q = search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.orderId.toLowerCase().includes(q) ||
          o.customer.fullName.toLowerCase().includes(q) ||
          o.customer.phone.includes(q) ||
          o.customer.email.toLowerCase().includes(q) ||
          (o.utrNumber && o.utrNumber.toLowerCase().includes(q))
      );
    }

    if (paymentStatus && paymentStatus !== "ALL") {
      orders = orders.filter((o) => o.paymentStatus === paymentStatus);
    }

    if (orderStatus && orderStatus !== "ALL") {
      orders = orders.filter((o) => o.orderStatus === orderStatus);
    }

    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await ordersDb.createOrder(body);
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 400 }
    );
  }
}
