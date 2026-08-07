import { Metadata } from "next";
import AdminLoginClient from "@/components/AdminLoginClient";

export const metadata: Metadata = {
  title: "Admin Login — LOS KAREL",
  description: "Secure Administrator Access Portal for LOS KAREL.",
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
