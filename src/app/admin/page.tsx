import React from "react";
import { getAdminMetricsAction } from "@/app/actions/adminActions";
import { LayoutDashboard, Users, ShoppingBag, Landmark, AlertTriangle, Calendar } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const metrics = await getAdminMetricsAction();

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

  // Find max sales for chart rendering scale
  const maxSales = Math.max(...metrics.salesChartData.map((d) => d.sales), 1000);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-darkText">Administrative Dashboard</h1>
        <p className="text-xs text-gray-500 mt-1">Real-time metrics, product stock levels, and sales charts.</p>
      </div>

      {/* Metrics Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
        
        {/* Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Total Sales</span>
            <p className="text-2xl font-extrabold text-primary">₹{metrics.totalRevenue}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
            <Landmark className="w-6 h-6" />
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Total Orders</span>
            <p className="text-2xl font-extrabold text-darkText">{metrics.totalOrders}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-500 flex items-center justify-center border border-gray-100">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Active Customers</span>
            <p className="text-2xl font-extrabold text-darkText">{metrics.totalUsers}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-500 flex items-center justify-center border border-gray-100">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Low stock Alert */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Low Stock Remedies</span>
            <p className="text-2xl font-extrabold text-red-600">{metrics.lowStockCount}</p>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            metrics.lowStockCount > 0 ? "bg-red-50 text-red-500 animate-pulse" : "bg-gray-50 text-gray-400"
          }`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Monthly Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-base text-darkText">Monthly Sales Pattern</h3>
          
          <div className="h-64 flex items-end gap-3 pt-6 border-b border-l border-gray-100 px-4">
            {metrics.salesChartData.map((d, i) => {
              const heightPct = `${(d.sales / maxSales) * 100}%`;
              return (
                <div key={i} className="flex-1 flex flex-col items-center group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 bg-darkText text-white text-[9px] font-bold py-1 px-2 rounded hidden group-hover:block z-15 whitespace-nowrap">
                    ₹{d.sales} ({d.orders} orders)
                  </div>
                  
                  {/* Visual column bar */}
                  <div
                    style={{ height: heightPct }}
                    className="w-full bg-primary hover:bg-secondary rounded-t-lg transition-all duration-300 min-h-[4px]"
                  />
                  
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">
                    {d.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Low Stock list details */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-xs">
          <h3 className="font-serif font-bold text-base text-darkText">Stock Reminders</h3>
          
          {metrics.lowStockCount === 0 ? (
            <p className="text-gray-400 italic py-4 text-center">All product stocks are healthy.</p>
          ) : (
            <div className="space-y-4">
              <p className="text-red-500 font-medium leading-relaxed">
                The following product formulations are running low on stock and require inventory refills.
              </p>
              <Link
                href="/admin/products"
                className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg text-center block transition-all"
              >
                Refill Inventory
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Latest Orders */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-xs">
        <h3 className="font-serif font-bold text-base text-darkText">Latest Orders</h3>

        {metrics.latestOrders.length === 0 ? (
          <p className="text-gray-400 italic py-4 text-center">No orders placed in store yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold">
                  <th className="pb-3">Invoice</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">User</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {metrics.latestOrders.map((ord: any) => (
                  <tr key={ord._id}>
                    <td className="py-3 font-mono font-bold text-darkText">{ord.invoiceNumber}</td>
                    <td className="py-3 text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(ord.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="py-3">
                      <p className="font-bold text-darkText">{ord.user?.name}</p>
                      <p className="text-gray-400 text-[10px]">{ord.user?.email}</p>
                    </td>
                    <td className="py-3 text-right font-bold text-primary">₹{ord.totalAmount}</td>
                    <td className="py-3 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold border capitalize ${getStatusColor(ord.deliveryStatus)}`}>
                        {ord.deliveryStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
