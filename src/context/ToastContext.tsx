"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Toast {
  id: string;
  message: string;
  type?: "gold" | "success" | "info";
}

interface ToastContextType {
  showToast: (message: string, type?: "gold" | "success" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "gold" | "success" | "info" = "gold") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Notification Portal */}
      <div style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        pointerEvents: "none"
      }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="anim-fade-up"
            style={{
              pointerEvents: "auto",
              background: "rgba(12, 12, 12, 0.95)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--clr-gold)",
              padding: "0.85rem 1.4rem",
              borderRadius: "2px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem"
            }}
          >
            <span style={{ color: "var(--clr-gold)", fontSize: "0.9rem" }}>✦</span>
            <span style={{
              fontFamily: "var(--font-title)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "var(--clr-text)",
              textTransform: "uppercase"
            }}>
              {toast.message}
            </span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
