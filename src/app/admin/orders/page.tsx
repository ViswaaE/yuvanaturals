"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { YuvaLogo } from "@/components/yuva-logo";
import { Order, OrderStatus, PaymentStatus } from "@/types/order";
import {
  CheckCircle2,
  Clock,
  Filter,
  Package,
  RefreshCw,
  Search,
  Truck,
  User,
  AlertCircle,
  Eye,
  X,
  Send,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  DollarSign,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [paymentFilter, setPaymentFilter] = useState<string>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Form states for updating selected order inside modal
  const [editOrderStatus, setEditOrderStatus] = useState<OrderStatus>("Pending Payment");
  const [editPaymentStatus, setEditPaymentStatus] = useState<PaymentStatus>("Pending");
  const [editUtr, setEditUtr] = useState("");
  const [editTrackingNumber, setEditTrackingNumber] = useState("");
  const [editCourierName, setEditCourierName] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filtered orders logic
  const filteredOrders = orders.filter((order) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      order.orderId.toLowerCase().includes(q) ||
      order.customer.fullName.toLowerCase().includes(q) ||
      order.customer.phone.includes(q) ||
      order.customer.email.toLowerCase().includes(q) ||
      (order.utrNumber && order.utrNumber.toLowerCase().includes(q));

    const matchesStatus = statusFilter === "ALL" || order.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === "ALL" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Calculate Metrics
  const todayStr = new Date().toISOString().split("T")[0];
  const todayOrders = orders.filter((o) => o.createdAt.startsWith(todayStr));
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.grandTotal, 0);

  const pendingVerifications = orders.filter(
    (o) => o.paymentStatus === "Verification Pending" || o.orderStatus === "Payment Verification Pending"
  );
  const confirmedCount = orders.filter((o) => o.orderStatus === "Confirmed").length;
  const processingCount = orders.filter((o) => o.orderStatus === "Processing").length;
  const shippedCount = orders.filter((o) => o.orderStatus === "Shipped").length;
  const deliveredCount = orders.filter((o) => o.orderStatus === "Delivered").length;

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setEditOrderStatus(order.orderStatus);
    setEditPaymentStatus(order.paymentStatus);
    setEditUtr(order.utrNumber || "");
    setEditTrackingNumber(order.trackingNumber || "");
    setEditCourierName(order.courierName || "Delhivery Express");
    setAdminNotes(order.adminNotes || "");
    setUpdateMessage(null);
  };

  const handleUpdateOrder = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedOrder) return;

    setUpdating(true);
    setUpdateMessage(null);

    try {
      const res = await fetch(`/api/orders/${selectedOrder.orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderStatus: editOrderStatus,
          paymentStatus: editPaymentStatus,
          utrNumber: editUtr,
          trackingNumber: editTrackingNumber,
          courierName: editCourierName,
          adminNotes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setUpdateMessage({ type: "success", text: "Order updated & notification sent successfully!" });
        setSelectedOrder(data.order);
        fetchOrders();
      } else {
        setUpdateMessage({ type: "error", text: data.error || "Failed to update order" });
      }
    } catch (err: any) {
      setUpdateMessage({ type: "error", text: err.message || "Network error" });
    } finally {
      setUpdating(false);
    }
  };

  // Quick Action: Verify UPI Payment
  const handleVerifyUpiPayment = async (order: Order) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${order.orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentStatus: "Paid",
          orderStatus: "Confirmed",
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchOrders();
        if (selectedOrder?.orderId === order.orderId) {
          setSelectedOrder(data.order);
          setEditPaymentStatus("Paid");
          setEditOrderStatus("Confirmed");
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A3C2F] font-sans antialiased">
      {/* Admin Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#1A3C2F] border-b border-[#C5A059]/30 text-[#FAF7F2] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/">
            <YuvaLogo variant="footer" showTagline={false} />
          </Link>
          <div className="hidden sm:block h-6 w-px bg-white/20" />
          <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Order Management Console
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-[#FAF7F2] px-3 py-1.5 text-xs font-semibold rounded-none border border-white/20 transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Sync Orders
          </button>

          <Link
            href="/"
            className="bg-[#C5A059] text-[#1A3C2F] px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-[#b08d4b] transition"
          >
            Storefront
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DFD5] pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3C2F]">
              Yuva Naturals Orders Dashboard
            </h1>
            <p className="text-xs text-[#556B61] mt-1">
              Real-time fulfillment, UPI transaction verification, customer communications, and delivery tracking.
            </p>
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex flex-wrap gap-2">
            <span className="border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-700" />
              {pendingVerifications.length} UPI Verification Pending
            </span>
          </div>
        </div>

        {/* STATS METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="bg-white border border-[#E5DFD5] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C907C]">Today Orders</span>
            <p className="text-xl font-extrabold text-[#1A3C2F] font-mono mt-1">{todayOrders.length}</p>
          </div>

          <div className="bg-white border border-[#E5DFD5] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C907C]">Today Revenue</span>
            <p className="text-xl font-extrabold text-[#C5A059] font-mono mt-1">₹{todayRevenue}</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Pending Verify</span>
            <p className="text-xl font-extrabold text-amber-900 font-mono mt-1">{pendingVerifications.length}</p>
          </div>

          <div className="bg-white border border-[#E5DFD5] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Confirmed</span>
            <p className="text-xl font-extrabold text-emerald-900 font-mono mt-1">{confirmedCount}</p>
          </div>

          <div className="bg-white border border-[#E5DFD5] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">Processing</span>
            <p className="text-xl font-extrabold text-blue-900 font-mono mt-1">{processingCount}</p>
          </div>

          <div className="bg-white border border-[#E5DFD5] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">Shipped</span>
            <p className="text-xl font-extrabold text-purple-900 font-mono mt-1">{shippedCount}</p>
          </div>

          <div className="bg-white border border-[#E5DFD5] p-4 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-800">Delivered</span>
            <p className="text-xl font-extrabold text-green-900 font-mono mt-1">{deliveredCount}</p>
          </div>
        </div>

        {/* SEARCH & FILTERS TOOLBAR */}
        <div className="bg-white border border-[#E5DFD5] p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7C907C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID (YN-10001), Customer Name, Phone, Email, UTR..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#E5DFD5] text-xs outline-none focus:border-[#1A3C2F]"
            />
          </div>

          {/* Filter Selects */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#1A3C2F]">
              <Filter className="h-3.5 w-3.5 text-[#C5A059]" /> Filters:
            </div>

            {/* Payment Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="bg-[#FAF7F2] border border-[#E5DFD5] text-xs px-3 py-2 outline-none font-medium"
            >
              <option value="ALL">All Payment Statuses</option>
              <option value="Verification Pending">Verification Pending</option>
              <option value="Paid">Paid</option>
              <option value="COD Pending">COD Pending</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>

            {/* Order Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#FAF7F2] border border-[#E5DFD5] text-xs px-3 py-2 outline-none font-medium"
            >
              <option value="ALL">All Order Statuses</option>
              <option value="Payment Verification Pending">Payment Verification Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* ORDERS TABLE */}
        <div className="border border-[#E5DFD5] bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#1A3C2F] text-[#FAF7F2] uppercase tracking-wider font-semibold text-[10px]">
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Customer &amp; Contact</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Items Summary</th>
                  <th className="p-3.5">Grand Total</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Order Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD5]">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-12 text-center text-[#556B61]">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-[#1A3C2F] mb-2" />
                      Loading Orders Database...
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-12 text-center text-[#556B61]">
                      No orders found matching search/filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-[#FAF7F2]/60 transition">
                      {/* Order ID */}
                      <td className="p-3.5 font-mono font-bold text-[#1A3C2F] whitespace-nowrap">
                        {order.orderId}
                      </td>

                      {/* Customer */}
                      <td className="p-3.5">
                        <p className="font-bold text-[#1A3C2F]">{order.customer.fullName}</p>
                        <p className="text-[10px] text-[#7C907C] font-mono">{order.customer.phone}</p>
                        <p className="text-[10px] text-[#7C907C] truncate max-w-[150px]">{order.customer.city}, {order.customer.state}</p>
                      </td>

                      {/* Date */}
                      <td className="p-3.5 text-[11px] text-[#556B61] whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        <br />
                        <span className="text-[10px] text-[#7C907C]">
                          {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>

                      {/* Items */}
                      <td className="p-3.5">
                        <div className="max-w-[200px] text-[11px] text-[#1A3C2F]">
                          {order.items.map((it) => (
                            <div key={it.productId} className="truncate">
                              {it.quantity}x {it.name}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="p-3.5 font-bold text-[#C5A059] font-mono text-sm whitespace-nowrap">
                        ₹{order.grandTotal}
                      </td>

                      {/* Payment */}
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider border px-1.5 py-0.5 bg-gray-50 text-[#1A3C2F]">
                            {order.paymentMethod.toUpperCase()}
                          </span>
                          <div>
                            {order.paymentStatus === "Verification Pending" ? (
                              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 inline-block">
                                Verification Pending
                              </span>
                            ) : order.paymentStatus === "Paid" ? (
                              <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 inline-block">
                                Paid ✓
                              </span>
                            ) : (
                              <span className="bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-bold px-2 py-0.5 inline-block">
                                {order.paymentStatus}
                              </span>
                            )}
                          </div>
                          {order.utrNumber && (
                            <p className="text-[9px] font-mono text-[#7C907C]">UTR: {order.utrNumber}</p>
                          )}
                        </div>
                      </td>

                      {/* Order Status */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border inline-block ${
                            order.orderStatus === "Confirmed"
                              ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                              : order.orderStatus === "Shipped"
                              ? "bg-purple-50 text-purple-900 border-purple-300"
                              : order.orderStatus === "Delivered"
                              ? "bg-green-100 text-green-900 border-green-300"
                              : order.orderStatus === "Cancelled"
                              ? "bg-red-50 text-red-900 border-red-300"
                              : "bg-amber-50 text-amber-900 border-amber-300"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {order.paymentStatus === "Verification Pending" && (
                            <button
                              onClick={() => handleVerifyUpiPayment(order)}
                              title="Verify UPI Payment"
                              className="bg-emerald-700 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-800 transition flex items-center gap-1"
                            >
                              <CheckCircle2 className="h-3 w-3" /> Verify UPI
                            </button>
                          )}

                          <button
                            onClick={() => openModal(order)}
                            className="bg-[#1A3C2F] text-[#FAF7F2] px-3 py-1.5 text-xs font-semibold hover:bg-[#C5A059] hover:text-[#1A3C2F] transition flex items-center gap-1"
                          >
                            <Eye className="h-3.5 w-3.5" /> Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ORDER DETAILS & STATUS UPDATE DRAWER MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border-l border-[#E5DFD5]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                  Fulfillment &amp; Verification
                </span>
                <h2 className="text-xl font-serif font-bold text-[#1A3C2F]">
                  Order #{selectedOrder.orderId}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-500 hover:text-[#1A3C2F] hover:bg-[#FAF7F2] transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {updateMessage && (
              <div
                className={`p-3.5 text-xs font-semibold border ${
                  updateMessage.type === "success"
                    ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                    : "bg-red-50 text-red-900 border-red-300"
                }`}
              >
                {updateMessage.text}
              </div>
            )}

            {/* Quick UPI Verification Alert Banner */}
            {selectedOrder.paymentStatus === "Verification Pending" && (
              <div className="bg-amber-50 border border-amber-300 p-4 space-y-3">
                <div className="flex items-start gap-2.5 text-amber-900 text-xs">
                  <AlertCircle className="h-5 w-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">UPI Payment Needs Manual Verification</p>
                    <p className="mt-0.5 text-[11px] text-amber-800">
                      Customer submitted UTR Transaction ID:{" "}
                      <strong className="font-mono bg-amber-200 px-1.5 py-0.5 text-amber-950">
                        {selectedOrder.utrNumber || "None Provided"}
                      </strong>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleVerifyUpiPayment(selectedOrder)}
                  disabled={updating}
                  className="w-full bg-emerald-800 text-white py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-emerald-900 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" /> VERIFY UPI PAYMENT &amp; CONFIRM ORDER
                </button>
              </div>
            )}

            {/* 1. Customer & Shipping Info */}
            <div className="border border-[#E5DFD5] bg-[#FAF7F2] p-4 sm:p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F] font-serif border-b border-[#E5DFD5] pb-2 flex items-center gap-2">
                <User className="h-4 w-4 text-[#C5A059]" /> Customer Information
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div>
                  <span className="text-[10px] text-[#7C907C] uppercase font-bold">Name:</span>
                  <p className="font-bold text-[#1A3C2F]">{selectedOrder.customer.fullName}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#7C907C] uppercase font-bold">Mobile Phone:</span>
                  <p className="font-mono text-[#1A3C2F]">{selectedOrder.customer.phone}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[10px] text-[#7C907C] uppercase font-bold">Email Address:</span>
                  <p className="text-[#1A3C2F]">{selectedOrder.customer.email}</p>
                </div>
                <div className="sm:col-span-2 border-t border-[#E5DFD5] pt-2">
                  <span className="text-[10px] text-[#7C907C] uppercase font-bold">Delivery Shipping Address:</span>
                  <p className="text-[#1A3C2F] leading-relaxed">
                    {selectedOrder.customer.addressLine1}
                    {selectedOrder.customer.addressLine2 ? `, ${selectedOrder.customer.addressLine2}` : ""}
                    <br />
                    {selectedOrder.customer.city}, {selectedOrder.customer.state} —{" "}
                    <strong>{selectedOrder.customer.pincode}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Order Items */}
            <div className="border border-[#E5DFD5] p-4 sm:p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A3C2F] font-serif border-b border-[#E5DFD5] pb-2">
                Order Contents ({selectedOrder.items.length} items)
              </h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between gap-3 text-xs border-b border-[#FAF7F2] pb-2">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 border border-[#E5DFD5] flex-shrink-0 bg-white">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-[#1A3C2F]">{item.name}</p>
                        <p className="text-[10px] text-[#7C907C]">{item.size} | Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold font-mono text-[#C5A059]">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 text-xs space-y-1 border-t border-[#E5DFD5] text-right">
                <p>Subtotal: <strong>₹{selectedOrder.subtotal}</strong></p>
                {selectedOrder.discount > 0 && <p className="text-emerald-700">Discount: -₹{selectedOrder.discount}</p>}
                <p>Shipping: <strong>{selectedOrder.shipping === 0 ? "FREE" : `₹${selectedOrder.shipping}`}</strong></p>
                <p className="text-base font-bold text-[#C5A059] pt-1">Grand Total: ₹{selectedOrder.grandTotal}</p>
              </div>
            </div>

            {/* 3. Status Management Form */}
            <form onSubmit={handleUpdateOrder} className="border border-[#1A3C2F] p-5 bg-[#1A3C2F] text-[#FAF7F2] space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider font-serif text-[#C5A059] border-b border-white/10 pb-2">
                Update Order Status &amp; Tracking
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Order Status */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#FAF7F2]">
                    Order Status
                  </label>
                  <select
                    value={editOrderStatus}
                    onChange={(e) => setEditOrderStatus(e.target.value as OrderStatus)}
                    className="mt-1 w-full bg-white text-[#1A3C2F] p-2 text-xs font-bold outline-none"
                  >
                    <option value="Pending Payment">Pending Payment</option>
                    <option value="Payment Verification Pending">Payment Verification Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                {/* Payment Status */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#FAF7F2]">
                    Payment Status
                  </label>
                  <select
                    value={editPaymentStatus}
                    onChange={(e) => setEditPaymentStatus(e.target.value as PaymentStatus)}
                    className="mt-1 w-full bg-white text-[#1A3C2F] p-2 text-xs font-bold outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Verification Pending">Verification Pending</option>
                    <option value="Paid">Paid (Verified)</option>
                    <option value="COD Pending">COD Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>

              {/* UTR Reference Number */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#FAF7F2]">
                  UPI UTR / Transaction ID
                </label>
                <input
                  type="text"
                  value={editUtr}
                  onChange={(e) => setEditUtr(e.target.value)}
                  placeholder="e.g. 987654321012"
                  className="mt-1 w-full bg-white text-[#1A3C2F] p-2 text-xs font-mono outline-none"
                />
              </div>

              {/* Tracking Details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#FAF7F2]">
                    Courier Partner Name
                  </label>
                  <input
                    type="text"
                    value={editCourierName}
                    onChange={(e) => setEditCourierName(e.target.value)}
                    placeholder="e.g. Delhivery / BlueDart"
                    className="mt-1 w-full bg-white text-[#1A3C2F] p-2 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#FAF7F2]">
                    Tracking AWB Number
                  </label>
                  <input
                    type="text"
                    value={editTrackingNumber}
                    onChange={(e) => setEditTrackingNumber(e.target.value)}
                    placeholder="e.g. AWB9876543"
                    className="mt-1 w-full bg-white text-[#1A3C2F] p-2 text-xs font-mono outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={updating}
                className="w-full bg-[#C5A059] text-[#1A3C2F] py-3 text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#b08d4b] transition flex items-center justify-center gap-2"
              >
                {updating ? "Saving & Notifying..." : "Save Changes & Dispatch Notification"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
