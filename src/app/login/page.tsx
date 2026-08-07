import { Metadata } from "next";
import LoginClient from "@/components/LoginClient";

export const metadata: Metadata = {
  title: "Sign In — LOS KAREL",
  description: "Access your LOS KAREL member portal and track your collectible orders.",
};

export default function LoginPage() {
  return <LoginClient />;
}
