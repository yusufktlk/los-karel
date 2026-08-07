"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { Product } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { useWishlist } from "@/context/WishlistContext";

export default function CollectionClient({ products }: { products: Product[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useLanguage();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <>
      {/* Sticky Filter Bar */}
      <div style={{
        position: "sticky", top: "5.5rem", zIndex: 30,
        background: "rgba(7,7,7,0.9)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--clr-border)", padding: "1rem 0",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "2rem" }}>
            {[t("colFilterAll"), t("colFilterTshirts"), t("colFilterNew")].map((f, i) => (
              <button key={f} style={{
                fontFamily: "var(--font-title)", fontSize: "0.65rem", letterSpacing: "0.25em",
                textTransform: "uppercase", border: "none", background: "none", cursor: "pointer",
                color: i === 0 ? "var(--clr-gold)" : "var(--clr-muted)",
                borderBottom: i === 0 ? "1px solid var(--clr-gold)" : "1px solid transparent",
                paddingBottom: "4px", transition: "color .3s",
              }}>{f}</button>
            ))}
          </div>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--clr-faint)", letterSpacing: "0.1em" }}>
            {products.length} {t("colCountSuffix")}
          </span>
        </div>
      </div>

      {/* Product Grid */}
      <section style={{ padding: "5rem 0 8rem", background: "var(--clr-bg)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3.5rem" }}>
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <div className="product-card" style={{ position: "relative" }}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}>
                  
                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      zIndex: 10,
                      background: "rgba(7, 7, 7, 0.8)",
                      border: "1px solid var(--clr-border)",
                      color: isInWishlist(p.id) ? "var(--clr-gold)" : "var(--clr-muted)",
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease"
                    }}
                    title={isInWishlist(p.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isInWishlist(p.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  <Link href={`/product/${p.slug}`}>
                    <div className="product-card-img">
                      <span className="card-hover-badge">{t("featuredBadge")}</span>
                      <Image src={p.images.back} alt={`${p.name} - Back View`} fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                      <div className="card-hover-img">
                        <Image src={p.images.front} alt={`${p.name} - Front View`} fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                      </div>
                    </div>

                    <div className="card-body">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <span className="card-sub">{p.collection}</span>
                          <h3 className="card-title">{p.name}</h3>
                          <p className="card-note">{p.inspiration}</p>
                        </div>
                        <span className="card-price" style={{ paddingTop: "1rem" }}>{p.currency}{p.price.toLocaleString("tr-TR")}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: "5rem 0", background: "var(--clr-bg2)", borderTop: "1px solid var(--clr-border)", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 500 }}>
          <Reveal>
            <span style={{ color: "var(--clr-gold)", fontSize: "1.2rem", display: "block", marginBottom: "1rem" }}>✦</span>
            <p style={{ fontFamily: "var(--font-title)", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--clr-gold)", marginBottom: "1rem" }}>{t("colFutureEyebrow")}</p>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem", fontWeight: 400, marginBottom: "1rem" }}>{t("colFutureTitle")}</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 1.8 }}>
              {t("colFutureDesc")}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
