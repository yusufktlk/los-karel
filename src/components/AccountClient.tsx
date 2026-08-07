"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Reveal from "@/components/Reveal";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { fetchUserOrdersAPI } from "@/services/api";

export default function AccountClient() {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    async function loadOrders() {
      if (!user?.email) return;
      setLoading(true);
      const orders = await fetchUserOrdersAPI(user.email);
      if (orders) {
        setUserOrders(orders);
      }
      setLoading(false);
    }
    loadOrders();
  }, [isAuthenticated, user, router]);

  const activeOrders = userOrders.filter((o) => o.status !== "DELIVERED" && o.status !== "CANCELLED");
  const pastOrders = userOrders.filter((o) => o.status === "DELIVERED" || o.status === "CANCELLED");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return { label: "TESLİM EDİLDİ", color: "#4CAF50", bg: "rgba(76, 175, 80, 0.1)" };
      case "SHIPPED":
        return { label: "KARGOLANDI", color: "#2196F3", bg: "rgba(33, 150, 243, 0.1)" };
      case "PROCESSING":
        return { label: "HAZIRLANIYOR", color: "var(--clr-gold)", bg: "rgba(196, 168, 124, 0.1)" };
      default:
        return { label: "BEKLEMEDE", color: "#FF9800", bg: "rgba(255, 152, 0, 0.1)" };
    }
  };

  if (!user) return null;

  const currentTabOrders = activeTab === "active" ? activeOrders : pastOrders;

  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "3rem", background: "var(--clr-bg)", position: "relative" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div className="eyebrow anim-fade-in">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">{t("accountEyebrow")}</span>
            </div>
            <h1 className="anim-fade-up d1" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300 }}>
              {t("accountTitle")}
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--clr-gold)", marginTop: "0.5rem" }}>
              {user.name || user.email}
            </p>
          </div>

          <button
            onClick={() => { logout(); router.push("/"); }}
            className="btn"
            style={{ padding: "0.75rem 1.75rem", fontSize: "0.65rem" }}
          >
            <span>{t("logoutBtn")}</span>
          </button>
        </div>
      </section>

      <div style={{ borderTop: "1px solid var(--clr-border)" }} />

      <section style={{ padding: "4rem 0 8rem", background: "var(--clr-bg)" }}>
        <div className="container" style={{ maxWidth: 880 }}>
          
          {/* Tabs Navigation */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", borderBottom: "1px solid var(--clr-border)", paddingBottom: "1rem" }}>
            <button
              onClick={() => setActiveTab("active")}
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                padding: "0.75rem 1.5rem",
                background: activeTab === "active" ? "var(--clr-gold)" : "none",
                color: activeTab === "active" ? "var(--clr-bg)" : "var(--clr-text)",
                border: "1px solid " + (activeTab === "active" ? "var(--clr-gold)" : "var(--clr-border)"),
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              {t("activeOrdersTab")} ({activeOrders.length})
            </button>

            <button
              onClick={() => setActiveTab("past")}
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                padding: "0.75rem 1.5rem",
                background: activeTab === "past" ? "var(--clr-gold)" : "none",
                color: activeTab === "past" ? "var(--clr-bg)" : "var(--clr-text)",
                border: "1px solid " + (activeTab === "past" ? "var(--clr-gold)" : "var(--clr-border)"),
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              {t("pastOrdersTab")} ({pastOrders.length})
            </button>
          </div>

          {/* Orders List */}
          {loading ? (
            <p style={{ color: "var(--clr-muted)", fontFamily: "var(--font-sans)" }}>Siparişleriniz yükleniyor...</p>
          ) : currentTabOrders.length === 0 ? (
            <div className="detail-block" style={{ padding: "4rem 2rem", textAlign: "center" }}>
              <span style={{ color: "var(--clr-gold)", fontSize: "2.2rem", opacity: 0.5, display: "block", marginBottom: "1rem" }}>✦</span>
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--clr-muted)", fontSize: "0.95rem" }}>
                {activeTab === "active" ? t("noActiveOrders") : t("noPastOrders")}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {currentTabOrders.map((o) => {
                const badge = getStatusBadge(o.status);
                return (
                  <Reveal key={o.id}>
                    <div className="detail-block" style={{ padding: "2.25rem", border: "1px solid var(--clr-border)" }}>
                      
                      {/* Order Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid var(--clr-border)", paddingBottom: "1.25rem", marginBottom: "1.75rem" }}>
                        <div>
                          <span style={{ fontFamily: "var(--font-title)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--clr-gold)", display: "block" }}>
                            SIPARİŞ KODU: #{o.id}
                          </span>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--clr-muted)", marginTop: "0.25rem" }}>
                            Tarih: {new Date(o.createdAt).toLocaleString("tr-TR")}
                          </p>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <span style={{
                            padding: "0.4rem 0.9rem",
                            borderRadius: "4px",
                            background: badge.bg,
                            color: badge.color,
                            fontFamily: "var(--font-title)",
                            fontSize: "0.65rem",
                            letterSpacing: "0.15em",
                            border: "1px solid " + badge.color
                          }}>
                            {badge.label}
                          </span>
                        </div>
                      </div>

                      {/* Purchased Products List with Images */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.75rem" }}>
                        {o.items?.map((item: any) => (
                          <div key={item.id} style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
                            {item.product?.backImage && (
                              <div style={{ position: "relative", width: "56px", height: "70px", border: "1px solid var(--clr-border)", background: "var(--clr-bg)", overflow: "hidden", flexShrink: 0 }}>
                                <Image src={item.product.backImage} alt={item.product.name} fill style={{ objectFit: "cover" }} />
                              </div>
                            )}
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontFamily: "var(--font-title)", fontSize: "0.9rem", fontWeight: 500 }}>
                                {item.product?.name || "Edisyon Parça"}
                              </h4>
                              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--clr-muted)", marginTop: "0.2rem" }}>
                                Beden: <strong>{item.size}</strong> · Adet: {item.quantity}
                              </p>
                            </div>
                            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--clr-text)" }}>
                              ₺{(item.price * item.quantity).toLocaleString("tr-TR")}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery & Total Amount Footer */}
                      <div style={{ borderTop: "1px solid var(--clr-border)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <div>
                          <span style={{ fontFamily: "var(--font-title)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--clr-muted)", textTransform: "uppercase", display: "block" }}>
                            TESLİMAT ADRESİ
                          </span>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--clr-muted)", marginTop: "0.2rem" }}>
                            {o.customerInfo?.address || "İstanbul"}
                          </p>
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontFamily: "var(--font-title)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--clr-gold)", textTransform: "uppercase", display: "block" }}>
                            TOPLAM TUTAR
                          </span>
                          <span style={{ fontFamily: "var(--font-title)", fontSize: "1.3rem", fontWeight: 500, color: "var(--clr-gold)" }}>
                            ₺{o.totalAmount.toLocaleString("tr-TR")}
                          </span>
                        </div>
                      </div>

                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
