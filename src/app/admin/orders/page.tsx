import React from "react";
import { dbConnect } from "@/lib/db";
import { Order } from "@/lib/models/Order";
import OrdersAdminClient from "@/components/admin/OrdersAdminClient";

export const metadata = {
  title: "Admin Order Management - Reature Organic",
  description: "Track shipping updates, update payment status, and review order receipts.",
};

export default async function AdminOrdersPage() {
  await dbConnect();

  // Load all orders populated with user details
  const ordersData = await Order.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  const orders = JSON.parse(JSON.stringify(ordersData));

  return <OrdersAdminClient orders={orders} />;
}
