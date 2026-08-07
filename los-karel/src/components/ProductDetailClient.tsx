"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Product } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function ProductDetailClient({ product, relatedProducts }: {
  product: Product; relatedProducts: Product[];
}) {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const gallery = [
    { src: product.images.back,   label: "Back View" },
    { src: product.images.front,  label: "Front View" },
    { src: product.images.erkek,  label: "Male Model" },
    { src: product.images.kadin,  label: "Female Model" },
    { src: product.images.kolaj,  label: "Details Collage" },
  ];

  const [sel, setSel] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleAddToCart = () => {
    if (!size) return;
    addToCart(product, size);
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ paddingTop: "7rem", paddingBottom: "1.5rem", background: "var(--clr-bg)", borderBottom: "1px solid var(--clr-border)" }}>
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">{t("breadcrumbHome")}</Link>
            <span>—</span>
            <Link href="/collection">{t("breadcrumbCollection")}</Link>
            <span>—</span>
            <span style={{ color: "var(--clr-text)" }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Info */}
      <section style={{ padding: "3.5rem 0 6rem", background: "var(--clr-bg)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "start" }}>
            
            {/* Gallery Container */}
            <div className="product-gallery-container">
              <div className="product-main-image-wrap">
                {gallery.map((img, i) => (
                  <Image key={i} src={img.src} alt={`${product.name} - ${img.label}`} fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    style={{
                      objectFit: "contain",
                      opacity: sel === i ? 1 : 0,
                      transition: "opacity 0.4s ease-in-out"
                    }}
                    priority={i === 0} />
                ))}
              </div>

              {/* Thumbnails */}
              <div className="thumbs-grid" style={{ gridTemplateColumns: `repeat(${gallery.length}, 1fr)` }}>
                {gallery.map((img, i) => (
                  <button key={i} onClick={() => setSel(i)}
                    className={`gallery-thumb ${sel === i ? "active" : ""}`}
                    aria-label={img.label}>
                    <Image src={img.src} alt={img.label} fill style={{ objectFit: "cover" }} sizes="140px" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Info */}
            <div>
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ width: "1.5rem", height: "1px", background: "var(--clr-gold)" }} />
                  <span style={{ fontFamily: "var(--font-title)", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--clr-gold)" }}>
                    {product.collection}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 500, letterSpacing: "0.05em", lineHeight: 1.15, marginBottom: "0.5rem" }}>
                  {product.name}
                </h1>
              </Reveal>

              <Reveal delay={130}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--clr-muted)", marginBottom: "1.75rem" }}>
                  {product.inspiration}
                </p>
              </Reveal>

              <Reveal delay={180}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.8rem", fontWeight: 400, color: "var(--clr-text)", marginBottom: "1.75rem" }}>
                  {product.currency}{product.price.toLocaleString("tr-TR")}
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div style={{ height: "1px", background: "var(--clr-border)", marginBottom: "1.75rem" }} />
              </Reveal>

              <Reveal delay={260}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 1.9, marginBottom: "2rem" }}>
                  {product.description}
                </p>
              </Reveal>

              {/* Sizes Selection */}
              <Reveal delay={300}>
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                    <span style={{ fontFamily: "var(--font-title)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--clr-text)" }}>{t("sizeSelectLabel")}</span>
                    <button style={{ fontFamily: "var(--font-title)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--clr-gold)", background: "none", border: "none", cursor: "pointer" }}>{t("sizeGuide")}</button>
                  </div>
                  <div style={{ display: "flex", gap: "0.6rem" }}>
                    {product.sizes.map(s => (
                      <button key={s} onClick={() => setSize(s)} className={`size-btn ${size === s ? "active" : ""}`}>{s}</button>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Add to Cart Button (Connected to Cart Context) */}
              <Reveal delay={350}>
                <button onClick={handleAddToCart}
                  className={`add-btn ${done ? "done" : size ? "ready" : ""}`}>
                  {done ? t("addedToCart") : size ? t("addToCart") : t("selectSizePrompt")}
                </button>
              </Reveal>

              {/* Detail Blocks */}
              <Reveal delay={400}>
                <div className="detail-block" style={{ marginTop: "2.5rem" }}>
                  <div className="detail-row">
                    <p className="detail-label">{t("specificationsTitle")}</p>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {product.details.map((d, i) => (
                        <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                          <span style={{ color: "var(--clr-gold)", fontSize: "0.5rem", marginTop: "0.45rem" }}>◆</span>
                          <span className="detail-text">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="detail-row">
                    <p className="detail-label">{t("shippingTitle")}</p>
                    <p className="detail-text">{t("shippingDesc")}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: "6rem 0", background: "var(--clr-bg2)", borderTop: "1px solid var(--clr-border)", borderBottom: "1px solid var(--clr-border)", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <Reveal>
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              <div className="eyebrow-line" />
              <span className="eyebrow-text">{t("narrativeEyebrow")}</span>
              <div className="eyebrow-line" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontStyle: "italic", marginBottom: "1.75rem" }}>{product.name}</h2>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 2, marginBottom: "2.5rem" }}>{product.story}</p>
          </Reveal>
          <Reveal delay={240}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center" }}>
              {product.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: "6rem 0", background: "var(--clr-bg)" }}>
          <div className="container">
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                <div className="eyebrow" style={{ justifyContent: "center" }}>
                  <div className="eyebrow-line" />
                  <span className="eyebrow-text">{t("complementaryEyebrow")}</span>
                  <div className="eyebrow-line" />
                </div>
                <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.8rem", fontWeight: 400 }}>{t("complementaryTitle")}</h2>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", maxWidth: 750, margin: "0 auto" }}>
              {relatedProducts.map((rp, i) => (
                <Reveal key={rp.id} delay={i * 120}>
                  <Link href={`/product/${rp.slug}`} className="product-card">
                    <div className="product-card-img" style={{ aspectRatio: "4/5" }}>
                      <Image src={rp.images.back} alt={rp.name} fill sizes="(max-width:768px) 100vw, 360px" style={{ objectFit: "cover" }} />
                    </div>
                    <div className="card-body">
                      <span className="card-sub">{rp.collection}</span>
                      <h3 className="card-title">{rp.name}</h3>
                      <p className="card-note">{rp.currency}{rp.price.toLocaleString("tr-TR")}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
