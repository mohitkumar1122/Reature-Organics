import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserAction } from "@/app/actions/authActions";
import { LayoutDashboard, ShoppingCart, BarChart3, Tag, Image as ImageIcon, BookOpen, FileText, CheckSquare, Settings, ArrowLeft, Users, Layers } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserAction();
  
  // Enforce Admin Verification
  if (!user || user.role !== "admin") {
    redirect("/auth/login?redirect=/admin");
  }

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: ShoppingCart },
    { label: "Categories", href: "/admin/categories", icon: Layers },
    { label: "Orders", href: "/admin/orders", icon: BarChart3 },
    { label: "Coupons", href: "/admin/coupons", icon: Tag },
    { label: "Banners", href: "/admin/banners", icon: ImageIcon },
    { label: "Blogs", href: "/admin/blogs", icon: BookOpen },
    { label: "Reviews", href: "/admin/reviews", icon: CheckSquare },
    { label: "Customers", href: "/admin/users", icon: Users },
    { label: "Resources", href: "/admin/resources", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col lg:flex-row pt-4">
      
      {/* Admin Side navigation panel */}
      <aside className="w-full lg:w-64 bg-white border-r border-gray-100 p-6 space-y-6 shrink-0 lg:fixed lg:top-20 lg:bottom-0 z-30 overflow-y-auto">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          
          <div className="pb-4 border-b border-gray-100">
            <h2 className="text-lg font-serif font-bold text-darkText">Console</h2>
            <span className="text-[10px] text-primary bg-primary-light font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mt-1 inline-block">
              Super Admin
            </span>
          </div>
        </div>

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
        </nav>
      </aside>

      {/* Main child viewport */}
      <main className="flex-1 lg:ml-64 p-6 md:p-10 overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}
