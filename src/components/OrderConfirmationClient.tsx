"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function OrderConfirmationClient({ orderId }: { orderId: string }) {
  const { clearCart } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section style={{ paddingTop: "10rem", paddingBottom: "8rem", background: "var(--clr-bg)", minHeight: "85vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: 650, textAlign: "center", margin: "0 auto" }}>
        
        <div className="detail-block" style={{ padding: "3.5rem 2rem", border: "1px solid var(--clr-border)" }}>
          <span style={{ color: "var(--clr-gold)", fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>✦</span>
          
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: "1.25rem" }}>
            <div className="eyebrow-line" />
            <span className="eyebrow-text">{t("confirmEyebrow")}</span>
            <div className="eyebrow-line" />
          </div>

          <h1 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, marginBottom: "1rem" }}>
            {t("confirmTitle")}
          </h1>

          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            {t("confirmSub")}
          </p>

          <div style={{
            background: "var(--clr-bg)",
            border: "1px dashed var(--clr-border)",
            padding: "1.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            textAlign: "left",
            marginBottom: "2.5rem"
          }}>
            <div>
              <span style={{ fontFamily: "var(--font-title)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--clr-gold)", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>
                {t("orderNumberLabel")}
              </span>
              <p style={{ fontFamily: "var(--font-title)", fontSize: "1.1rem", fontWeight: 500 }}>
                {orderId}
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-title)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--clr-gold)", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>
                {t("estimatedDeliveryLabel")}
              </span>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--clr-text)" }}>
                {t("estimatedDeliveryValue")}
              </p>
            </div>
          </div>

          <Link href="/collection" className="btn btn-solid" style={{ padding: "1rem 2.5rem" }}>
            <span>{t("continueShoppingBtn")} →</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
