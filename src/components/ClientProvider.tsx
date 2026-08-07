"use client";
import { ReactNode } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartDrawer from "@/components/CartDrawer";

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
          <CartDrawer />
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  );
}
