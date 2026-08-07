import { Metadata } from "next";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Control Panel — LOS KAREL",
  description: "Internal management dashboard for LOS KAREL orders, inventory, and analytics.",
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
