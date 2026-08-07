import { Metadata } from "next";
import CheckoutClient from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — LOS KAREL",
  description: "Complete your order securely at LOS KAREL.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
