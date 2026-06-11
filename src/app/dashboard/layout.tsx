import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserAction } from "@/app/actions/authActions";
import { ShoppingBag, Heart, MapPin, User, Settings, ShieldCheck } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserAction();
  if (!user) {
    redirect("/auth/login?redirect=/dashboard");
  }

  const menuItems = [
    { label: "My Profile", href: "/dashboard", icon: User },
    { label: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { label: "My Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { label: "Saved Addresses", href: "/dashboard/addresses", icon: MapPin },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
            
            {/* User Details summary */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-darkText truncate">{user.name}</h3>
                <span className="text-[10px] text-gray-400 capitalize">{user.role} Account</span>
              </div>
            </div>

            {/* Menu options */}
            <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 pb-2 lg:pb-0 text-xs font-semibold text-gray-600">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl hover:bg-gray-50 hover:text-primary transition-all whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary-light/50 text-primary hover:bg-primary-light transition-all whitespace-nowrap mt-4"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Admin Console</span>
                </Link>
              )}
            </nav>

          </div>
        </aside>

        {/* Content area */}
        <div className="flex-1 min-w-0">
          {children}
        </div>

      </div>
    </div>
  );
}
