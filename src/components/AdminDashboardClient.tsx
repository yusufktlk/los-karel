"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Reveal from "@/components/Reveal";
import {
  fetchAdminStatsAPI,
  fetchAdminOrdersAPI,
  updateOrderStatusAPI,
  fetchProductsAPI,
  uploadProductImageAPI,
  createProductAPI,
} from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Product } from "@/data/products";

export default function AdminDashboardClient() {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [stats, setStats] = useState({ totalOrders: 0, totalProducts: 2, totalUsers: 1, totalRevenue: 0 });
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // New Product Modal Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    slug: "",
    price: "1290",
    inspiration: "Inspired by Ottoman Artistry · MMXXVI",
    description: "",
    story: "",
  });

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

  const handleCreateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let backImageUrl = "/products/iznik_heritage/back.png";
    let frontImageUrl = "/products/iznik_heritage/front.png";

    if (backFile) {
      const backRes = await uploadProductImageAPI(backFile);
      if (backRes?.imageUrl) backImageUrl = backRes.imageUrl;
    }

    if (frontFile) {
      const frontRes = await uploadProductImageAPI(frontFile);
      if (frontRes?.imageUrl) frontImageUrl = frontRes.imageUrl;
    }

    const payload = {
      name: newProduct.name,
      slug: newProduct.slug || newProduct.name.toLowerCase().replace(/\s+/g, "-"),
      price: parseFloat(newProduct.price),
      inspiration: newProduct.inspiration,
      description: newProduct.description || newProduct.name,
      story: newProduct.story || newProduct.description,
      backImage: backImageUrl,
      frontImage: frontImageUrl,
      sizes: ["S", "M", "L", "XL"],
    };

    const res = await createProductAPI(payload);
    setSubmitting(false);

    if (res) {
      showToast("Yeni edisyon ürün başarıyla yayınlandı!");
      setIsModalOpen(false);
      setNewProduct({ name: "", slug: "", price: "1290", inspiration: "Inspired by Ottoman Artistry · MMXXVI", description: "", story: "" });
      setBackFile(null);
      setFrontFile(null);
      
      // Refresh products list
      const updatedProducts = await fetchProductsAPI();
      if (updatedProducts) setProducts(updatedProducts);
    } else {
      showToast("Ürün eklenirken bir hata oluştu", "info");
    }
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

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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

            {activeTab === "products" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-solid"
                style={{ padding: "0.75rem 1.5rem", fontSize: "0.75rem" }}
              >
                <span>+ Yeni Edisyon Ekle</span>
              </button>
            )}
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 300 }}>
                  Aktif Edisyonlar & Stok Yönetimi
                </h2>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-solid"
                  style={{ padding: "0.75rem 1.5rem", fontSize: "0.75rem" }}
                >
                  <span>+ Yeni Edisyon Ekle</span>
                </button>
              </div>

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

      {/* NEW PRODUCT MODAL */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(10, 10, 10, 0.92)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            overflowY: "auto",
          }}
        >
          <div
            className="detail-block"
            style={{
              maxWidth: 600,
              width: "100%",
              padding: "2.5rem",
              border: "1px solid var(--clr-gold)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.2rem", letterSpacing: "0.15em", color: "var(--clr-gold)" }}>
                Yeni Edisyon Parça Ekle
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", color: "var(--clr-muted)", fontSize: "1.2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                  Edisyon Adı *
                </label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Gülhane Heritage Tee"
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    background: "var(--clr-bg)",
                    border: "1px solid var(--clr-border)",
                    color: "var(--clr-text)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                    Fiyat (₺) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="1290"
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      background: "var(--clr-bg)",
                      border: "1px solid var(--clr-border)",
                      color: "var(--clr-text)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                    İlham Dönemi *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.inspiration}
                    onChange={(e) => setNewProduct({ ...newProduct, inspiration: e.target.value })}
                    placeholder="Inspired by Gülhane · XVII. YY"
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      background: "var(--clr-bg)",
                      border: "1px solid var(--clr-border)",
                      color: "var(--clr-text)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                  Edisyon Hikayesi & Anlatısı *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newProduct.story}
                  onChange={(e) => setNewProduct({ ...newProduct, story: e.target.value })}
                  placeholder="Osmanlı Saray bahçelerinin zarafetini taşıyan derin anlatı..."
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    background: "var(--clr-bg)",
                    border: "1px solid var(--clr-border)",
                    color: "var(--clr-text)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
              </div>

              {/* Back Image File Input */}
              <div>
                <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-gold)", display: "block", marginBottom: "0.4rem" }}>
                  📷 Arka Yüz Görseli (Back Art) *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBackFile(e.target.files ? e.target.files[0] : null)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 1rem",
                    background: "var(--clr-bg)",
                    border: "1px dashed var(--clr-border)",
                    color: "var(--clr-text)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8rem",
                  }}
                />
              </div>

              {/* Front Image File Input */}
              <div>
                <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-gold)", display: "block", marginBottom: "0.4rem" }}>
                  📷 Ön Yüz Görseli (Front Logo View)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFrontFile(e.target.files ? e.target.files[0] : null)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 1rem",
                    background: "var(--clr-bg)",
                    border: "1px dashed var(--clr-border)",
                    color: "var(--clr-text)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8rem",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-solid"
                style={{ width: "100%", padding: "1.1rem", marginTop: "1rem" }}
              >
                <span>{submitting ? "Yükleniyor & Yayınlanıyor..." : "Edisyonu Yayınla →"}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
