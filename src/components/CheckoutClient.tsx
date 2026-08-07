"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { createOrderAPI } from "@/services/api";

export default function CheckoutClient() {
  const { cart, totalPrice } = useCart();
  const { t } = useLanguage();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "4543 •••• •••• 1234",
    expDate: "12/28",
    cvc: "888",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    const orderPayload = {
      customerInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city} ${formData.postalCode}`,
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: totalPrice,
    };

    const res = await createOrderAPI(orderPayload);
    const orderId = res?.orderId || `LK-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      setLoading(false);
      router.push(`/order-confirmation/${orderId}`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <section style={{ paddingTop: "10rem", paddingBottom: "6rem", background: "var(--clr-bg)", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 500 }}>
          <span style={{ color: "var(--clr-gold)", fontSize: "2.5rem", opacity: 0.5, display: "block", marginBottom: "1rem" }}>✦</span>
          <h1 style={{ fontFamily: "var(--font-title)", fontSize: "1.8rem", fontWeight: 400, marginBottom: "1rem" }}>
            {t("wishlistEmptyTitle")}
          </h1>
          <Link href="/collection" className="btn btn-solid" style={{ marginTop: "1.5rem" }}>
            <span>{t("featuredViewBtn")}</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "3rem", background: "var(--clr-bg)", position: "relative" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="eyebrow anim-fade-in" style={{ justifyContent: "center" }}>
            <div className="eyebrow-line" />
            <span className="eyebrow-text">{t("checkoutEyebrow")}</span>
            <div className="eyebrow-line" />
          </div>
          <h1 className="anim-fade-up d1" style={{ fontFamily: "var(--font-title)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 400, letterSpacing: "0.06em" }}>
            {t("checkoutTitle")}
          </h1>
        </div>
      </section>

      <div style={{ borderTop: "1px solid var(--clr-border)" }} />

      <section style={{ padding: "5rem 0 8rem", background: "var(--clr-bg)" }}>
        <div className="container">
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "start" }}>
            
            {/* Form Fields Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {/* 1. Contact & Shipping */}
              <div className="detail-block" style={{ padding: "2rem" }}>
                <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1rem", fontWeight: 500, letterSpacing: "0.15em", color: "var(--clr-gold)", marginBottom: "1.5rem" }}>
                  {t("contactInfoTitle")}
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                      {t("fullNameLabel")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      style={{
                        width: "100%",
                        padding: "0.9rem 1rem",
                        background: "var(--clr-bg)",
                        border: "1px solid var(--clr-border)",
                        color: "var(--clr-text)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.85rem",
                        outline: "none"
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                        {t("emailLabel")} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        style={{
                          width: "100%",
                          padding: "0.9rem 1rem",
                          background: "var(--clr-bg)",
                          border: "1px solid var(--clr-border)",
                          color: "var(--clr-text)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          outline: "none"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                        {t("phoneLabel")} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+90 532 ••• •• ••"
                        style={{
                          width: "100%",
                          padding: "0.9rem 1rem",
                          background: "var(--clr-bg)",
                          border: "1px solid var(--clr-border)",
                          color: "var(--clr-text)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                      {t("addressLabel")} *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Abdi İpekçi Cad. No: 42 Nişantaşı"
                      style={{
                        width: "100%",
                        padding: "0.9rem 1rem",
                        background: "var(--clr-bg)",
                        border: "1px solid var(--clr-border)",
                        color: "var(--clr-text)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.85rem",
                        outline: "none",
                        resize: "vertical"
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                        {t("cityLabel")} *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="İstanbul"
                        style={{
                          width: "100%",
                          padding: "0.9rem 1rem",
                          background: "var(--clr-bg)",
                          border: "1px solid var(--clr-border)",
                          color: "var(--clr-text)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          outline: "none"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                        {t("postalCodeLabel")} *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="34367"
                        style={{
                          width: "100%",
                          padding: "0.9rem 1rem",
                          background: "var(--clr-bg)",
                          border: "1px solid var(--clr-border)",
                          color: "var(--clr-text)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Payment Details */}
              <div className="detail-block" style={{ padding: "2rem" }}>
                <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1rem", fontWeight: 500, letterSpacing: "0.15em", color: "var(--clr-gold)", marginBottom: "1.5rem" }}>
                  {t("paymentInfoTitle")}
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                      {t("cardNumberLabel")}
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.9rem 1rem",
                        background: "var(--clr-bg)",
                        border: "1px solid var(--clr-border)",
                        color: "var(--clr-text)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.85rem",
                        outline: "none"
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                        {t("expDateLabel")}
                      </label>
                      <input
                        type="text"
                        name="expDate"
                        value={formData.expDate}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "0.9rem 1rem",
                          background: "var(--clr-bg)",
                          border: "1px solid var(--clr-border)",
                          color: "var(--clr-text)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          outline: "none"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                        {t("cvcLabel")}
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "0.9rem 1rem",
                          background: "var(--clr-bg)",
                          border: "1px solid var(--clr-border)",
                          color: "var(--clr-text)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="detail-block" style={{ padding: "2rem", position: "sticky", top: "7.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.1rem", fontWeight: 500, letterSpacing: "0.15em", color: "var(--clr-gold)", marginBottom: "1.5rem" }}>
                {t("orderSummaryTitle")}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.75rem" }}>
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <div style={{ position: "relative", width: "56px", height: "70px", border: "1px solid var(--clr-border)", background: "var(--clr-bg)", overflow: "hidden", flexShrink: 0 }}>
                      <Image src={item.product.images.back} alt={item.product.name} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontFamily: "var(--font-title)", fontSize: "0.85rem", fontWeight: 500 }}>
                        {item.product.name}
                      </h4>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--clr-muted)" }}>
                        Size: {item.size} × {item.quantity}
                      </p>
                    </div>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem" }}>
                      ₺{(item.product.price * item.quantity).toLocaleString("tr-TR")}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid var(--clr-border)", paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--clr-muted)" }}>
                  <span>{t("subtotalLabel")}</span>
                  <span>₺{totalPrice.toLocaleString("tr-TR")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--clr-muted)" }}>
                  <span>{t("shippingLabel")}</span>
                  <span style={{ color: "var(--clr-gold)" }}>{t("shippingFree")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-title)", fontSize: "1.1rem", fontWeight: 500, color: "var(--clr-text)", paddingTop: "0.75rem", borderTop: "1px solid var(--clr-border)" }}>
                  <span>{t("totalLabel")}</span>
                  <span>₺{totalPrice.toLocaleString("tr-TR")}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-solid"
                style={{ width: "100%", padding: "1.2rem" }}
              >
                <span>{loading ? t("processingOrder") : t("placeOrderBtn")}</span>
              </button>
            </div>

          </form>
        </div>
      </section>
    </>
  );
}
