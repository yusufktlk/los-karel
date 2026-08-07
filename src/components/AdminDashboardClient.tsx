"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Reveal from "@/components/Reveal";
import { fetchAdminStatsAPI, fetchAdminOrdersAPI, updateOrderStatusAPI, fetchProductsAPI } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { Product } from "@/data/products";

export default function AdminDashboardClient() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [stats, setStats] = useState({ totalOrders: 0, totalProducts: 2, totalUsers: 1, totalRevenue: 0 });
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Route guard: Redirect if not logged in or not ADMIN
    const savedUser = JSON.parse(localStorage.getItem("los_karel_user") || "{}");
    if (!isAuthenticated && savedUser.role !== "ADMIN") {
      router.push("/admin/login");
      return;
    }

    async function loadAdminData() {
      setLoading(true);
      const [sData, oData, pData] = await Promise.all([
        fetchAdminStatsAPI(),
        fetchAdminOrdersAPI(),
        fetchProductsAPI(),
      ]);
      if (sData) setStats(sData);
      if (oData) setOrders(oData);
      if (pData) setProducts(pData);
      setLoading(false);
    }
    loadAdminData();
  }, [isAuthenticated, router]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    await updateOrderStatusAPI(orderId, newStatus);
  };

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

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: "8rem", paddingBottom: "3rem", background: "var(--clr-bg)", position: "relative" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div className="eyebrow anim-fade-in">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">GÜVENLİ YÖNETİM KONTROL PANELİ</span>
            </div>
            <h1 className="anim-fade-up d1" style={{ fontFamily: "var(--font-title)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
              LOS KAREL Admin
            </h1>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => setActiveTab("orders")}
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                padding: "0.75rem 1.5rem",
                background: activeTab === "orders" ? "var(--clr-gold)" : "none",
                color: activeTab === "orders" ? "var(--clr-bg)" : "var(--clr-text)",
                border: "1px solid " + (activeTab === "orders" ? "var(--clr-gold)" : "var(--clr-border)"),
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              SİPARİŞLER ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab("products")}
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                padding: "0.75rem 1.5rem",
                background: activeTab === "products" ? "var(--clr-gold)" : "none",
                color: activeTab === "products" ? "var(--clr-bg)" : "var(--clr-text)",
                border: "1px solid " + (activeTab === "products" ? "var(--clr-gold)" : "var(--clr-border)"),
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              ÜRÜN KATALOĞU ({products.length})
            </button>
          </div>
        </div>
      </section>

      <div style={{ borderTop: "1px solid var(--clr-border)" }} />

      {/* Metrics Banner */}
      <section style={{ padding: "3rem 0", background: "var(--clr-bg2)", borderBottom: "1px solid var(--clr-border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            <div className="detail-block" style={{ padding: "1.5rem" }}>
              <span style={{ fontFamily: "var(--font-title)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--clr-gold)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                TOPLAM CİRO
              </span>
              <p style={{ fontFamily: "var(--font-title)", fontSize: "1.8rem", fontWeight: 400 }}>
                ₺{stats.totalRevenue.toLocaleString("tr-TR")}
              </p>
            </div>

            <div className="detail-block" style={{ padding: "1.5rem" }}>
              <span style={{ fontFamily: "var(--font-title)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--clr-gold)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                GELEN SİPARİŞLER
              </span>
              <p style={{ fontFamily: "var(--font-title)", fontSize: "1.8rem", fontWeight: 400 }}>
                {orders.length > 0 ? orders.length : stats.totalOrders}
              </p>
            </div>

            <div className="detail-block" style={{ padding: "1.5rem" }}>
              <span style={{ fontFamily: "var(--font-title)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--clr-gold)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                AKTİF EDİSYONLAR
              </span>
              <p style={{ fontFamily: "var(--font-title)", fontSize: "1.8rem", fontWeight: 400 }}>
                {products.length}
              </p>
            </div>

            <div className="detail-block" style={{ padding: "1.5rem" }}>
              <span style={{ fontFamily: "var(--font-title)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--clr-gold)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                KAYITLI ÜYELER
              </span>
              <p style={{ fontFamily: "var(--font-title)", fontSize: "1.8rem", fontWeight: 400 }}>
                {stats.totalUsers}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tables */}
      <section style={{ padding: "4rem 0 8rem", background: "var(--clr-bg)" }}>
        <div className="container">
          {activeTab === "orders" ? (
            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 300, marginBottom: "2rem" }}>
                Sipariş Yönetim Listesi
              </h2>

              {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 1rem", border: "1px solid var(--clr-border)" }}>
                  <p style={{ fontFamily: "var(--font-sans)", color: "var(--clr-muted)" }}>Henüz kayıtlı bir sipariş bulunmuyor.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  {orders.map((o) => {
                    const badge = getStatusBadge(o.status);
                    return (
                      <Reveal key={o.id}>
                        <div className="detail-block" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                          
                          {/* Order Header info */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid var(--clr-border)", paddingBottom: "1.25rem" }}>
                            <div>
                              <span style={{ fontFamily: "var(--font-title)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--clr-gold)", display: "block" }}>
                                SIPARİŞ NO: #{o.id}
                              </span>
                              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--clr-muted)", marginTop: "0.25rem" }}>
                                {new Date(o.createdAt).toLocaleString("tr-TR")}
                              </p>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
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

                              <select
                                value={o.status}
                                onChange={(e) => handleStatusChange(o.id, e.target.value)}
                                style={{
                                  background: "var(--clr-bg)",
                                  border: "1px solid var(--clr-border)",
                                  color: "var(--clr-text)",
                                  fontFamily: "var(--font-sans)",
                                  fontSize: "0.8rem",
                                  padding: "0.4rem 0.75rem",
                                  outline: "none"
                                }}
                              >
                                <option value="PENDING">Beklemede</option>
                                <option value="PROCESSING">Hazırlanıyor</option>
                                <option value="SHIPPED">Kargolandı</option>
                                <option value="DELIVERED">Teslim Edildi</option>
                              </select>
                            </div>
                          </div>

                          {/* Customer & Items Details */}
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                            {/* Customer info */}
                            <div>
                              <h4 style={{ fontFamily: "var(--font-title)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--clr-gold)", marginBottom: "0.75rem" }}>
                                MÜŞTERİ BİLGİLERİ
                              </h4>
                              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 500, color: "var(--clr-text)" }}>
                                {o.customerInfo?.name || "Bilinmiyor"}
                              </p>
                              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--clr-muted)" }}>
                                {o.customerInfo?.email} · {o.customerInfo?.phone}
                              </p>
                              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--clr-muted)", marginTop: "0.5rem", lineHeight: 1.6 }}>
                                📍 {o.customerInfo?.address}
                              </p>
                            </div>

                            {/* Order Items */}
                            <div>
                              <h4 style={{ fontFamily: "var(--font-title)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--clr-gold)", marginBottom: "0.75rem" }}>
                                SATIN ALINAN PARÇALAR
                              </h4>
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {o.items?.map((item: any) => (
                                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem" }}>
                                    <span>
                                      {item.product?.name || "Edisyon Parça"} (Beden: <strong>{item.size}</strong>) × {item.quantity}
                                    </span>
                                    <span style={{ color: "var(--clr-gold)" }}>₺{(item.price * item.quantity).toLocaleString("tr-TR")}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <div style={{ borderTop: "1px solid var(--clr-border)", marginTop: "1rem", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-title)", fontSize: "1rem" }}>
                                <span>Toplam Tutar:</span>
                                <span>₺{o.totalAmount.toLocaleString("tr-TR")}</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 300, marginBottom: "2rem" }}>
                Aktif Edisyonlar & Stok Yönetimi
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
                {products.map((p) => (
                  <div key={p.id} className="detail-block" style={{ padding: "2rem" }}>
                    <div style={{ position: "relative", aspectRatio: "4/3", width: "100%", marginBottom: "1.5rem", border: "1px solid var(--clr-border)", background: "var(--clr-bg)" }}>
                      <Image src={p.images.back} alt={p.name} fill style={{ objectFit: "cover" }} />
                    </div>

                    <span style={{ fontFamily: "var(--font-title)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--clr-gold)", textTransform: "uppercase" }}>
                      {p.collection}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 300, margin: "0.3rem 0 0.75rem" }}>
                      {p.name}
                    </h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--clr-muted)", marginBottom: "1.25rem" }}>
                      {p.inspiration}
                    </p>

                    <div style={{ borderTop: "1px solid var(--clr-border)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-title)", fontSize: "1.2rem", color: "var(--clr-gold)" }}>
                        ₺{p.price.toLocaleString("tr-TR")}
                      </span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "#4CAF50", background: "rgba(76,175,80,0.1)", padding: "0.3rem 0.75rem", borderRadius: "4px" }}>
                        Stokta Mevcut (S, M, L, XL)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
