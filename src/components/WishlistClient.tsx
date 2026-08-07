"use client";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";

export default function WishlistClient() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { t } = useLanguage();

  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "var(--clr-bg)", position: "relative" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="eyebrow anim-fade-in" style={{ justifyContent: "center" }}>
            <div className="eyebrow-line" />
            <span className="eyebrow-text">{t("wishlistEyebrow")}</span>
            <div className="eyebrow-line" />
          </div>
          <h1 className="anim-fade-up d1" style={{ fontFamily: "var(--font-title)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 400, letterSpacing: "0.06em" }}>
            {t("wishlistTitle")}
          </h1>
        </div>
      </section>

      <div style={{ borderTop: "1px solid var(--clr-border)" }} />

      <section style={{ padding: "5rem 0 8rem", background: "var(--clr-bg)" }}>
        <div className="container">
          {wishlist.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 1rem" }}>
              <span style={{ color: "var(--clr-gold)", fontSize: "2rem", opacity: 0.5, display: "block", marginBottom: "1rem" }}>✦</span>
              <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.4rem", fontWeight: 400, marginBottom: "1rem" }}>
                {t("wishlistEmptyTitle")}
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 1.8, maxWidth: 460, margin: "0 auto 2.5rem" }}>
                {t("wishlistEmptyDesc")}
              </p>
              <Link href="/collection" className="btn btn-solid">
                <span>{t("featuredViewBtn")}</span>
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3.5rem" }}>
              {wishlist.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <div className="product-card" style={{ position: "relative" }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFromWishlist(p.id); }}
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        zIndex: 10,
                        background: "rgba(7, 7, 7, 0.85)",
                        border: "1px solid var(--clr-border)",
                        color: "var(--clr-gold)",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.9rem"
                      }}
                      title="Remove"
                    >
                      ✕
                    </button>

                    <Link href={`/product/${p.slug}`}>
                      <div className="product-card-img">
                        <Image src={p.images.back} alt={p.name} fill style={{ objectFit: "cover" }} />
                        <div className="card-hover-img">
                          <Image src={p.images.front} alt={p.name} fill style={{ objectFit: "cover" }} />
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
          )}
        </div>
      </section>
    </>
  );
}
