"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { lang } = useLanguage();

  const isTR = lang === "TR";

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className={`cart-overlay ${isCartOpen ? "open" : ""}`}
        onClick={closeCart}
      />

      {/* Slide-out Drawer Panel */}
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        {/* Header */}
        <div style={{
          padding: "1.5rem 1.75rem",
          borderBottom: "1px solid var(--clr-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.1rem", fontWeight: 500, letterSpacing: "0.15em" }}>
              {isTR ? "SEPETİNİZ" : "YOUR CART"}
            </h3>
            <span style={{
              fontFamily: "var(--font-title)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "var(--clr-gold)",
              background: "rgba(196, 168, 124, 0.12)",
              border: "1px solid var(--clr-border)",
              padding: "0.2rem 0.6rem"
            }}>
              {totalItems} {isTR ? "PARÇA" : "ITEMS"}
            </span>
          </div>

          <button
            onClick={closeCart}
            style={{
              background: "none",
              border: "none",
              color: "var(--clr-muted)",
              fontSize: "1.4rem",
              cursor: "pointer",
              transition: "color 0.3s ease",
              padding: "0.25rem"
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "var(--clr-gold)")}
            onMouseOut={(e) => (e.currentTarget.style.color = "var(--clr-muted)")}
            aria-label="Close Cart"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 1.75rem" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
              <span style={{ color: "var(--clr-gold)", fontSize: "2.5rem", opacity: 0.5, display: "block", marginBottom: "1rem" }}>
                ✦
              </span>
              <p style={{ fontFamily: "var(--font-title)", fontSize: "1.2rem", fontWeight: 400, marginBottom: "0.75rem" }}>
                {isTR ? "SEPETİNİZ BOŞ" : "YOUR CART IS EMPTY"}
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--clr-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
                {isTR
                  ? "Koleksiyonumuzdaki özel parçaları keşfedin ve gardırobunuza ekleyin."
                  : "Discover our archival collectible pieces and add them to your wardrobe."}
              </p>
              <Link
                href="/collection"
                onClick={closeCart}
                className="btn btn-solid"
                style={{ width: "100%" }}
              >
                <span>{isTR ? "KOLEKSİYONU KEŞFET" : "EXPLORE COLLECTION"}</span>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    paddingBottom: "1.5rem",
                    borderBottom: "1px solid var(--clr-border)"
                  }}
                >
                  {/* Item Image */}
                  <div style={{
                    position: "relative",
                    width: "80px",
                    height: "100px",
                    background: "var(--clr-bg)",
                    border: "1px solid var(--clr-border)",
                    flexShrink: 0,
                    overflow: "hidden"
                  }}>
                    <Image
                      src={item.product.images.back}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* Item Info */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <h4 style={{ fontFamily: "var(--font-title)", fontSize: "0.95rem", fontWeight: 500, letterSpacing: "0.05em" }}>
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--clr-faint)",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.color = "var(--clr-gold)")}
                          onMouseOut={(e) => (e.currentTarget.style.color = "var(--clr-faint)")}
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </div>

                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--clr-gold)", marginTop: "0.2rem" }}>
                        {isTR ? "Beden" : "Size"}: <span style={{ color: "var(--clr-text)" }}>{item.size}</span>
                      </p>
                    </div>

                    {/* Quantity controls & Price */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.75rem" }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid var(--clr-border)",
                        background: "var(--clr-bg)"
                      }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, -1)}
                          style={{
                            width: "28px",
                            height: "28px",
                            background: "none",
                            border: "none",
                            color: "var(--clr-text)",
                            cursor: "pointer"
                          }}
                        >
                          -
                        </button>
                        <span style={{
                          width: "24px",
                          textAlign: "center",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.75rem"
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, 1)}
                          style={{
                            width: "28px",
                            height: "28px",
                            background: "none",
                            border: "none",
                            color: "var(--clr-text)",
                            cursor: "pointer"
                          }}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 400 }}>
                        {item.product.currency}{(item.product.price * item.quantity).toLocaleString("tr-TR")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Section */}
        {cart.length > 0 && (
          <div style={{
            padding: "1.5rem 1.75rem",
            borderTop: "1px solid var(--clr-border)",
            background: "var(--clr-bg)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-title)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--clr-muted)" }}>
                {isTR ? "ARA TOPLAM" : "SUBTOTAL"}
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", fontWeight: 400, color: "var(--clr-text)" }}>
                ₺{totalPrice.toLocaleString("tr-TR")}
              </span>
            </div>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--clr-faint)", marginBottom: "1.25rem" }}>
              {isTR
                ? "Vergiler dahil. Kargo ücreti ödeme adımında hesaplanır."
                : "Taxes included. Shipping calculated at checkout."}
            </p>

            <button
              onClick={() => alert(isTR ? "Ödeme sistemine yönlendiriliyorsunuz..." : "Redirecting to checkout...")}
              className="btn btn-solid"
              style={{ width: "100%", padding: "1.1rem" }}
            >
              <span>{isTR ? "ÖDEMEYE GEÇ →" : "PROCEED TO CHECKOUT →"}</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
