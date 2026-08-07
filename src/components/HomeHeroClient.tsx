"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Product } from "@/data/products";

export default function HomeHeroClient({ featuredProduct }: { featuredProduct: Product }) {
  const { t } = useLanguage();

  return (
    <section style={{
      position: "relative",
      minHeight: "95vh",
      display: "flex",
      alignItems: "center",
      background: "radial-gradient(ellipse at center, #151412 0%, #070707 80%)",
      overflow: "hidden",
      borderBottom: "1px solid var(--clr-border)",
      paddingTop: "5.5rem"
    }}>
      {/* Corner Golden Accents */}
      <div className="corner-tl" style={{ top: "6.5rem", left: "2.5rem" }} />
      <div className="corner-tr" style={{ top: "6.5rem", right: "2.5rem" }} />
      <div className="corner-bl" style={{ bottom: "2.5rem", left: "2.5rem" }} />
      <div className="corner-br" style={{ bottom: "2.5rem", right: "2.5rem" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "3.5rem",
          alignItems: "center"
        }}>
          
          {/* Left Content Column */}
          <div>
            {/* Eyebrow */}
            <div className="anim-fade-in" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
              <div style={{ width: "2rem", height: "1px", background: "var(--clr-gold)" }} />
              <span style={{
                fontFamily: "var(--font-title)",
                fontSize: "0.65rem",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "var(--clr-gold)"
              }}>
                {t("heroEyebrow")}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="anim-fade-up d1" style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
              fontWeight: 400,
              letterSpacing: "0.06em",
              lineHeight: 1.05,
              color: "var(--clr-text)",
              marginBottom: "1.75rem"
            }}>
              {t("heroHeadline1")} <br />
              <span className="serif-italic gold-text">{t("heroHeadline2")}</span>
            </h1>

            {/* Description */}
            <p className="anim-fade-up d2" style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              fontWeight: 300,
              color: "var(--clr-muted)",
              lineHeight: 1.9,
              maxWidth: 480,
              marginBottom: "2.5rem"
            }}>
              {t("heroDescription")}
            </p>

            {/* CTAs */}
            <div className="anim-fade-up d3" style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              <Link href="/collection" className="btn btn-solid">
                <span>{t("heroExploreBtn")}</span>
              </Link>
              <Link href="/about" className="btn">
                <span>{t("heroStoryBtn")}</span>
              </Link>
            </div>
          </div>

          {/* Right Editorial Showcase Card */}
          <div className="anim-fade-up d2" style={{ position: "relative" }}>
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: "440px",
              margin: "0 auto",
              aspectRatio: "3/4",
              border: "1px solid var(--clr-border2)",
              background: "rgba(14, 14, 14, 0.8)",
              backdropFilter: "blur(12px)",
              padding: "1rem",
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)"
            }}>
              <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", border: "1px solid var(--clr-border)" }}>
                <Image
                  src={featuredProduct.images.back}
                  alt="LOS KAREL Hero Artwork"
                  fill
                  sizes="(max-width: 768px) 100vw, 440px"
                  style={{ objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.5rem 1.25rem",
                  background: "linear-gradient(to top, rgba(7,7,7,0.95) 0%, transparent 100%)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end"
                }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-title)", fontSize: "0.58rem", letterSpacing: "0.25em", color: "var(--clr-gold)", textTransform: "uppercase" }}>
                      EDITION N° 01
                    </span>
                    <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.1rem", fontWeight: 500, color: "var(--clr-text)", marginTop: "0.2rem" }}>
                      {featuredProduct.name}
                    </h3>
                  </div>
                  <Link href={`/product/${featuredProduct.slug}`} style={{
                    fontFamily: "var(--font-title)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    color: "var(--clr-gold)",
                    textTransform: "uppercase",
                    borderBottom: "1px solid var(--clr-gold)"
                  }}>
                    VIEW →
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
