import React from "react";
import { getOrdersAction } from "@/app/actions/orderActions";
import Link from "next/link";
import { ShoppingBag, Eye, Calendar, Printer } from "lucide-react";

export default async function DashboardOrdersPage() {
  const orders = await getOrdersAction();

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
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-darkText">My Orders</h2>
        <p className="text-xs text-gray-500 mt-1">Review shipping status and download dynamic PDF invoices.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 space-y-4 text-xs text-gray-400 border border-dashed border-gray-200 rounded-2xl">
          <ShoppingBag className="w-10 h-10 mx-auto text-gray-300" />
          <p>You haven't placed any orders yet.</p>
          <Link
            href="/shop"
            className="inline-block py-2 px-5 bg-primary text-white hover:bg-primary-dark font-bold rounded-full"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              
              {/* Left Side: Receipt summaries */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono font-bold text-darkText text-sm">{order.invoiceNumber}</span>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold border capitalize ${getStatusColor(order.deliveryStatus)}`}>
                    {order.deliveryStatus}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                  <span>Amount: <span className="font-bold text-primary">₹{order.totalAmount}</span></span>
                  <span className="capitalize">Method: {order.paymentMethod}</span>
                </div>
                
                {/* Item Titles */}
                <div className="text-gray-400 font-medium truncate max-w-sm">
                  {order.items.map((i: any) => `${i.title} (x${i.quantity})`).join(", ")}
                </div>
              </div>

              {/* Right Side: View/Print actions */}
              <div className="flex items-center gap-2 self-start md:self-center">
                <Link
                  href={`/checkout/success?id=${order._id}`}
                  className="inline-flex items-center gap-1 py-2 px-4 rounded-full bg-primary-light text-primary hover:bg-primary hover:text-white font-bold transition-all"
                >
                  <Eye className="w-3.5 h-3.5" /> Details
                </Link>
                <Link
                  href={`/checkout/success?id=${order._id}`}
                  className="p-2 border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-darkText rounded-full transition-colors"
                  title="Print Invoice"
                >
                  <Printer className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
