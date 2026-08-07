"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("los_karel_wishlist");
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("los_karel_wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore storage errors
    }
  }, [wishlist]);

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        totalWishlistItems: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
