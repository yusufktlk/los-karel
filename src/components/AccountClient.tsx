"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Reveal from "@/components/Reveal";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { fetchAdminOrdersAPI } from "@/services/api";

export default function AccountClient() {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    async function loadOrders() {
      setLoading(true);
      const allOrders = await fetchAdminOrdersAPI();
      if (allOrders && user) {
        const filtered = allOrders.filter(
          (o: any) => o.customerInfo?.email?.toLowerCase() === user.email.toLowerCase()
        );
        setUserOrders(filtered);
      }
      setLoading(false);
    }
    loadOrders();
  }, [isAuthenticated, user, router]);

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

      <section style={{ padding: "5rem 0 8rem", background: "var(--clr-bg)" }}>
        <div className="container" style={{ maxWidth: 850 }}>
          <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.4rem", fontWeight: 400, marginBottom: "2rem", letterSpacing: "0.1em" }}>
            {t("orderHistoryTitle")}
          </h2>

          {loading ? (
            <p style={{ color: "var(--clr-muted)", fontFamily: "var(--font-sans)" }}>Siparişleriniz yükleniyor...</p>
          ) : userOrders.length === 0 ? (
            <div className="detail-block" style={{ padding: "3rem", textAlign: "center" }}>
              <span style={{ color: "var(--clr-gold)", fontSize: "2rem", opacity: 0.5, display: "block", marginBottom: "1rem" }}>✦</span>
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--clr-muted)" }}>
                {t("noOrdersMessage")}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {userOrders.map((o) => {
                const badge = getStatusBadge(o.status);
                return (
                  <Reveal key={o.id}>
                    <div className="detail-block" style={{ padding: "2rem" }}>
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid var(--clr-border)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                        <div>
                          <span style={{ fontFamily: "var(--font-title)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--clr-gold)", display: "block" }}>
                            SIPARİŞ NO: #{o.id}
                          </span>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--clr-muted)", marginTop: "0.25rem" }}>
                            Tarih: {new Date(o.createdAt).toLocaleDateString("tr-TR")}
                          </p>
                        </div>

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

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                        {o.items?.map((item: any) => (
                          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontFamily: "var(--font-sans)" }}>
                            <span>
                              {item.product?.name || "Edisyon Parça"} (Beden: <strong>{item.size}</strong>) × {item.quantity}
                            </span>
                            <span>₺{(item.price * item.quantity).toLocaleString("tr-TR")}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ borderTop: "1px solid var(--clr-border)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-title)", fontSize: "1.1rem", color: "var(--clr-gold)" }}>
                        <span>Genel Toplam:</span>
                        <span>₺{o.totalAmount.toLocaleString("tr-TR")}</span>
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
