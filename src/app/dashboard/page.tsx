import React from "react";
import { getCurrentUserAction } from "@/app/actions/authActions";
import { getOrdersAction } from "@/app/actions/orderActions";
import { User, Calendar, Mail, MapPin, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getCurrentUserAction();
  const orders = await getOrdersAction();

  if (!user) return null;

  return (
    <div className="space-y-6">
      
      {/* Profile summary header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-darkText">Account Overview</h2>
          <p className="text-xs text-gray-500 mt-1">Manage your customer profile and monitor orders.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50 text-xs">
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 text-gray-500">
              <User className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="block text-gray-400 font-semibold uppercase text-[9px] tracking-wider">Full Name</span>
                <span className="text-sm font-bold text-darkText">{user.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-gray-500">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="block text-gray-400 font-semibold uppercase text-[9px] tracking-wider">Email Address</span>
                <span className="text-sm font-bold text-darkText">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 text-gray-500">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="block text-gray-400 font-semibold uppercase text-[9px] tracking-wider">Account Created</span>
                <span className="text-sm font-bold text-darkText">
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Total Orders Widget */}
        <Link href="/dashboard/orders" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-darkText">My Orders</h4>
            <p className="text-2xl font-bold text-primary">{orders.length}</p>
            <p className="text-[10px] text-gray-400">View recent transactions and invoices</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </Link>

        {/* Saved Addresses Widget */}
        <Link href="/dashboard/addresses" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-darkText">Saved Addresses</h4>
            <p className="text-2xl font-bold text-secondary">{user.addresses?.length ?? 0}</p>
            <p className="text-[10px] text-gray-400">Manage billing and delivery coordinates</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
        </Link>

      </div>

    </div>
  );
}
