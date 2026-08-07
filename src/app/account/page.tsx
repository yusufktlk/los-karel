import { Metadata } from "next";
import AccountClient from "@/components/AccountClient";

export const metadata: Metadata = {
  title: "My Account — LOS KAREL",
  description: "View your order history and manage your member profile at LOS KAREL.",
};

export default function AccountPage() {
  return <AccountClient />;
}
