import { Metadata } from "next";
import WishlistClient from "@/components/WishlistClient";

export const metadata: Metadata = {
  title: "Wishlist — LOS KAREL",
  description: "Your saved archival collectible pieces at LOS KAREL.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
