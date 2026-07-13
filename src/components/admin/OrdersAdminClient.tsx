"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { adminUpdateOrderStatusAction } from "@/app/actions/adminActions";
import { Search, X } from "lucide-react";
import Link from "next/link";

interface OrdersAdminClientProps {
  orders: any[];
}

export default function OrdersAdminClient({ orders }: OrdersAdminClientProps) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter orders based on search query
  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return orders;

    return orders.filter((order) => {
      const name = order.user?.name?.toLowerCase() || "";
      const email = order.user?.email?.toLowerCase() || "";
      const invoice = order.invoiceNumber?.toLowerCase() || "";

      return (
        name.includes(query) ||
        email.includes(query) ||
        invoice.includes(query)
      );
    });
  }, [searchQuery, orders]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="space-y-6 text-xs">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darkText">
            Order Management
          </h1>
          <p className="text-gray-500">
            Track shipping, update invoice payment statuses, and print receipts.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email or invoice..."
            className="w-full pl-8 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-xs
                       text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary
                       focus:ring-2 focus:ring-primary/10 transition-all font-medium shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                         hover:text-gray-600 transition-colors"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Search result count indicator */}
      {searchQuery && (
        <div className="flex items-center gap-2">
          <span className="text-gray-500">
            Showing{" "}
            <span className="font-bold text-darkText">
              {filteredOrders.length}
            </span>{" "}
            {filteredOrders.length === 1 ? "result" : "results"} for{" "}
            <span className="font-bold text-primary">
              &quot;{searchQuery}&quot;
            </span>
          </span>
          <button
            onClick={handleClearSearch}
            className="text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* Table list */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <p className="text-gray-400 italic py-16 text-center">
            No orders registered in the system yet.
          </p>
        ) : filteredOrders.length === 0 ? (
          /* No search results state */
          <div className="py-16 flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Search size={20} className="text-gray-400" />
            </div>
            <div>
              <p className="font-semibold text-darkText text-sm">
                No orders found
              </p>
              <p className="text-gray-400 text-[11px] mt-0.5">
                No results for &quot;{searchQuery}&quot;. Try a different name,
                email, or invoice number.
              </p>
            </div>
            <button
              onClick={handleClearSearch}
              className="mt-1 text-primary font-semibold underline underline-offset-2 text-[11px]
                         hover:opacity-75 transition-opacity"
            >
              Clear search
            </button>
          </div>
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
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4">
                    <Link
                      href={`/checkout/success?id=${order._id}`}
                      className="font-mono font-bold text-primary hover:underline text-sm"
                    >
                      {/* Highlight matching invoice text */}
                      {searchQuery &&
                      order.invoiceNumber
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ? (
                        <HighlightText
                          text={order.invoiceNumber}
                          query={searchQuery}
                        />
                      ) : (
                        order.invoiceNumber
                      )}
                    </Link>
                    <p className="text-gray-400 text-[9px] mt-0.5 uppercase">
                      {order.paymentMethod}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-darkText">
                      {/* Highlight matching name text */}
                      {searchQuery &&
                      order.user?.name
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ? (
                        <HighlightText
                          text={order.user?.name || "Deleted User"}
                          query={searchQuery}
                        />
                      ) : (
                        order.user?.name || "Deleted User"
                      )}
                    </p>
                    <p className="text-gray-400 text-[10px]">
                      {/* Highlight matching email text */}
                      {searchQuery &&
                      order.user?.email
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ? (
                        <HighlightText
                          text={order.user?.email}
                          query={searchQuery}
                        />
                      ) : (
                        order.user?.email
                      )}
                    </p>
                  </td>
                  <td className="p-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right font-bold text-primary">
                    ₹{order.totalAmount}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[9px] border capitalize ${
                        order.paymentStatus === "paid"
                          ? "bg-green-50 text-green-600 border-green-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold border capitalize ${getStatusColor(order.deliveryStatus)}`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <select
                      disabled={updatingId === order._id}
                      value={order.deliveryStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="bg-[#F8FAF7] border border-gray-200 rounded-lg p-1.5
                                 focus:outline-none font-semibold text-[10px] disabled:opacity-50
                                 disabled:cursor-not-allowed transition-opacity"
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

// Helper component to highlight matching text
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query || !text) return <>{text}</>;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={index}
            className="bg-primary/15 text-primary rounded px-0.5 not-italic font-bold"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}