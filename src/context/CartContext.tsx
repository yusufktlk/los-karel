"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";
import { useToast } from "@/context/ToastContext";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("los_karel_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("los_karel_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (product: Product, size: string, quantity = 1) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (index > -1) {
        const next = [...prev];
        next[index].quantity += quantity;
        return next;
      }
      return [...prev, { product, size, quantity }];
    });
    showToast(`${product.name} (${size}) sepete eklendi`);
    openCart();
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
    showToast("Ürün sepetten çıkarıldı");
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
