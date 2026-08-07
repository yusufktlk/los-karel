"use client";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Product } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { useWishlist } from "@/context/WishlistContext";

export default function HomeClient({ products }: { products: Product[] }) {
  const { t } = useLanguage();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const S = {
    section: { padding: "6.5rem 0", background: "var(--clr-bg)" } as React.CSSProperties,
    sectionAlt: { padding: "6.5rem 0", background: "var(--clr-bg2)", borderTop: "1px solid var(--clr-border)", borderBottom: "1px solid var(--clr-border)" } as React.CSSProperties,
  };

  const values = [
    { num: t("val1Num"), title: t("val1Title"), text: t("val1Text") },
    { num: t("val2Num"), title: t("val2Title"), text: t("val2Text") },
    { num: t("val3Num"), title: t("val3Title"), text: t("val3Text") },
    { num: t("val4Num"), title: t("val4Title"), text: t("val4Text") },
  ];

  return (
    <>
      {/* ── PHILOSOPHY ── */}
      <section style={S.sectionAlt}>
        <div className="container" style={{ maxWidth: 800, textAlign: "center" }}>
          <Reveal>
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              <div className="eyebrow-line" />
              <span className="eyebrow-text">{t("manifestoEyebrow")}</span>
              <div className="eyebrow-line" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 400, lineHeight: 1.3, marginBottom: "1.75rem" }}>
              {t("manifestoTitle1")} <span className="serif-italic gold-text">{t("manifestoTitle2")}</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 2, maxWidth: 620, margin: "0 auto" }}>
              {t("manifestoDesc")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURED COLLECTION (BACK DEFAULT, FRONT HOVER) ── */}
      <section style={S.section}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div className="eyebrow" style={{ justifyContent: "center" }}>
                <div className="eyebrow-line" />
                <span className="eyebrow-text">{t("featuredEyebrow")}</span>
                <div className="eyebrow-line" />
              </div>
              <h2 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 400 }}>{t("featuredTitle")}</h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem" }}>
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 120}>
                <div className="product-card" style={{ position: "relative" }}>
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

          <Reveal delay={250}>
            <div style={{ textAlign: "center", marginTop: "4rem" }}>
              <Link href="/collection" className="btn"><span>{t("featuredViewBtn")}</span></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BRAND VALUES GRID ── */}
      <section style={S.sectionAlt}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2.5rem" }}>
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="detail-block" style={{ padding: "2rem", height: "100%" }}>
                  <span style={{ fontFamily: "var(--font-title)", fontSize: "0.85rem", color: "var(--clr-gold)", opacity: 0.7, display: "block", marginBottom: "0.75rem" }}>{v.num}</span>
                  <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.25rem", fontWeight: 500, marginBottom: "0.75rem" }}>{v.title}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 1.8 }}>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ ...S.section, position: "relative" }}>
        <div className="container" style={{ maxWidth: 540, textAlign: "center" }}>
          <Reveal>
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              <div className="eyebrow-line" />
              <span className="eyebrow-text">{t("newsletterEyebrow")}</span>
              <div className="eyebrow-line" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(1.6rem,3vw,2.5rem)", fontWeight: 400, marginBottom: "1rem" }}>{t("newsletterTitle")}</h2>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              {t("newsletterDesc")}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="newsletter-wrap">
              <input type="email" placeholder={t("newsletterInputPlaceholder")} className="newsletter-input" />
              <button className="newsletter-btn">{t("newsletterBtn")}</button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
