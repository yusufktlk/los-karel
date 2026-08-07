"use client";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { articles } from "@/data/journal";
import { useLanguage } from "@/context/LanguageContext";

export default function JournalClient() {
  const { lang, t } = useLanguage();
  const isTR = lang === "TR";

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "var(--clr-bg)", position: "relative" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="eyebrow anim-fade-in" style={{ justifyContent: "center" }}>
            <div className="eyebrow-line" />
            <span className="eyebrow-text">{t("journalEyebrow")}</span>
            <div className="eyebrow-line" />
          </div>
          <h1 className="anim-fade-up d1" style={{ fontFamily: "var(--font-title)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 400, letterSpacing: "0.06em" }}>
            {t("journalTitle")}
          </h1>
          <p className="anim-fade-up d2" style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 300, color: "var(--clr-muted)", marginTop: "1rem", maxWidth: 520, margin: "1rem auto 0" }}>
            {t("journalDesc")}
          </p>
        </div>
      </section>

      <div style={{ borderTop: "1px solid var(--clr-border)" }} />

      {/* Articles Grid (Equal Heights & Larger Image Aspect Ratio) */}
      <section style={{ padding: "6rem 0 8rem", background: "var(--clr-bg)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "3.5rem", alignItems: "stretch" }}>
            {articles.map((article, i) => (
              <Reveal key={article.id} delay={i * 120} style={{ height: "100%" }}>
                <Link href={`/journal/${article.slug}`} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div className="detail-block" style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    
                    {/* Increased Image Height (280px height container) */}
                    <div style={{ position: "relative", width: "100%", height: "280px", background: "var(--clr-bg)", overflow: "hidden" }}>
                      <Image
                        src={article.image}
                        alt={isTR ? article.titleTR : article.titleEN}
                        fill
                        sizes="(max-width: 768px) 100vw, 550px"
                        style={{ objectFit: "cover" }}
                      />
                      <span style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        background: "rgba(7,7,7,0.85)",
                        border: "1px solid var(--clr-border)",
                        padding: "0.35rem 0.85rem",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.62rem",
                        color: "var(--clr-gold)",
                        letterSpacing: "0.15em"
                      }}>
                        {article.readTime}
                      </span>
                    </div>

                    {/* Equal Card Body Content */}
                    <div style={{ padding: "2rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.85rem" }}>
                          <span style={{ fontFamily: "var(--font-title)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--clr-gold)" }}>
                            {article.date}
                          </span>
                          <span style={{ color: "var(--clr-faint)", fontSize: "0.5rem" }}>✦</span>
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", color: "var(--clr-muted)" }}>
                            {article.author}
                          </span>
                        </div>

                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.45rem", fontWeight: 300, lineHeight: 1.3, marginBottom: "1rem" }}>
                          {isTR ? article.titleTR : article.titleEN}
                        </h2>

                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
                          {isTR ? article.subtitleTR : article.subtitleEN}
                        </p>
                      </div>

                      <span style={{
                        fontFamily: "var(--font-title)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        color: "var(--clr-gold)",
                        textTransform: "uppercase",
                        paddingTop: "1rem",
                        borderTop: "1px solid var(--clr-border)"
                      }}>
                        {t("readArticle")}
                      </span>
                    </div>

                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
