"use client";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Article } from "@/data/journal";
import { getProductBySlug } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";

export default function ArticleDetailClient({ article }: { article: Article }) {
  const { lang, t } = useLanguage();
  const isTR = lang === "TR";

  const relatedProduct = article.relatedProductSlug ? getProductBySlug(article.relatedProductSlug) : null;

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ paddingTop: "7rem", paddingBottom: "1.5rem", background: "var(--clr-bg)", borderBottom: "1px solid var(--clr-border)" }}>
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">{t("breadcrumbHome")}</Link>
            <span>—</span>
            <Link href="/journal">{t("navJournal")}</Link>
            <span>—</span>
            <span style={{ color: "var(--clr-text)" }}>{isTR ? article.titleTR : article.titleEN}</span>
          </nav>
        </div>
      </div>

      {/* Main Article Header */}
      <section style={{ padding: "5rem 0 3rem", background: "var(--clr-bg)" }}>
        <div className="container" style={{ maxWidth: 800, textAlign: "center" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <span style={{ fontFamily: "var(--font-title)", fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--clr-gold)" }}>
                {article.date}
              </span>
              <span style={{ color: "var(--clr-faint)", fontSize: "0.5rem" }}>✦</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--clr-muted)" }}>
                {article.readTime}
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 300, lineHeight: 1.25, marginBottom: "1.5rem" }}>
              {isTR ? article.titleTR : article.titleEN}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", fontWeight: 300, color: "var(--clr-gold)", lineHeight: 1.7, maxWidth: 640, margin: "0 auto 2.5rem" }}>
              {isTR ? article.subtitleTR : article.subtitleEN}
            </p>
          </Reveal>
        </div>

        {/* Featured Cover Image */}
        <div className="container" style={{ maxWidth: 950 }}>
          <Reveal delay={240}>
            <div style={{
              position: "relative",
              aspectRatio: "16/9",
              width: "100%",
              border: "1px solid var(--clr-border)",
              background: "var(--clr-bg2)",
              overflow: "hidden"
            }}>
              <Image
                src={article.image}
                alt={isTR ? article.titleTR : article.titleEN}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 950px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Article Content Paragraphs */}
      <section style={{ padding: "4rem 0 6rem", background: "var(--clr-bg)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {(isTR ? article.contentTR : article.contentEN).map((paragraph, index) => (
              <Reveal key={index} delay={index * 100}>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  fontWeight: 300,
                  color: "var(--clr-text)",
                  lineHeight: 2,
                  letterSpacing: "0.01em"
                }}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Related Product Promotion Block inside Article */}
          {relatedProduct && (
            <Reveal delay={300}>
              <div className="detail-block" style={{ marginTop: "4.5rem", padding: "2rem", textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-title)", fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--clr-gold)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                  {isTR ? "HİKAYENİN PARÇASI" : "THE PHYSICAL EMBODIMENT"}
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 300, marginBottom: "1rem" }}>
                  {relatedProduct.name}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--clr-muted)", marginBottom: "1.75rem" }}>
                  {relatedProduct.inspiration}
                </p>
                <Link href={`/product/${relatedProduct.slug}`} className="btn btn-solid">
                  <span>{t("featuredBadge")} ({relatedProduct.currency}{relatedProduct.price}) →</span>
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
