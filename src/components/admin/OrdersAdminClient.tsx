"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUpdateOrderStatusAction } from "@/app/actions/adminActions";
import { BarChart3, Clock, Printer, CheckSquare, XCircle } from "lucide-react";
import Link from "next/link";

interface OrdersAdminClientProps {
  orders: any[];
}

export default function OrdersAdminClient({ orders }: OrdersAdminClientProps) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    const res = await adminUpdateOrderStatusAction(orderId, newStatus);
    if (res.success) {
      router.refresh();
    }
    setUpdatingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="space-y-6 text-xs">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-darkText">Order Management</h1>
        <p className="text-gray-500">Track shipping, update invoice payment statuses, and print receipts.</p>
      </div>

      {/* Table list */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <p className="text-gray-400 italic py-16 text-center">No orders registered in the system yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold bg-gray-50/50">
                <th className="p-4">Invoice #</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Payment Status</th>
                <th className="p-4 text-center">Delivery Status</th>
                <th className="p-4 text-center">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="p-4">
                    <Link
                      href={`/checkout/success?id=${order._id}`}
                      className="font-mono font-bold text-primary hover:underline text-sm"
                    >
                      {order.invoiceNumber}
                    </Link>
                    <p className="text-gray-400 text-[9px] mt-0.5 uppercase">{order.paymentMethod}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-darkText">{order.user?.name || "Deleted User"}</p>
                    <p className="text-gray-400 text-[10px]">{order.user?.email}</p>
                  </td>
                  <td className="p-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right font-bold text-primary">
                    Rs. {order.totalAmount}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] border capitalize ${
                      order.paymentStatus === "paid"
                        ? "bg-green-50 text-green-600 border-green-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold border capitalize ${getStatusColor(order.deliveryStatus)}`}>
                      {order.deliveryStatus}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <select
                      disabled={updatingId === order._id}
                      value={order.deliveryStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="bg-[#F8FAF7] border border-gray-200 rounded-lg p-1.5 focus:outline-none font-semibold text-[10px]"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
