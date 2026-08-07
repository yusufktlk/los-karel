"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutClient() {
  const { t } = useLanguage();

  const S = {
    section: { padding: "6rem 0", background: "var(--clr-bg)" } as React.CSSProperties,
    sectionAlt: { padding: "6rem 0", background: "var(--clr-bg2)", borderTop: "1px solid var(--clr-border)", borderBottom: "1px solid var(--clr-border)" } as React.CSSProperties,
  };

  const values = [
    { num: t("val1Num"), title: t("val1Title"), text: t("val1Text") },
    { num: t("val2Num"), title: t("val2Title"), text: t("val2Text") },
    { num: t("val3Num"), title: t("val3Title"), text: t("val3Text") },
  ];

  const narratives = [
    { title: t("iznikTitle"), period: t("iznikPeriod"), text: t("iznikDesc") },
    { title: t("wovenTitle"), period: t("wovenPeriod"), text: t("wovenDesc") },
    { title: t("comingSoonTitle"), period: t("comingSoonPeriod"), text: t("comingSoonDesc") },
  ];

  return (
    <>
      {/* ── BRAND VISION ── */}
      <section style={S.sectionAlt}>
        <div className="container" style={{ maxWidth: 850, textAlign: "center", margin: "0 auto" }}>
          <Reveal>
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              <div className="eyebrow-line" />
              <span className="eyebrow-text">{t("visionEyebrow")}</span>
              <div className="eyebrow-line" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 400,
              lineHeight: 1.4,
              marginBottom: "1.75rem",
              textAlign: "center",
              color: "var(--clr-text)"
            }}>
              {t("visionTitle1")}{" "}
              <span className="serif-italic" style={{ color: "var(--clr-gold)", fontStyle: "italic", display: "inline-block" }}>
                {t("visionTitle2")}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 2, textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
              {t("visionDesc")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={S.section}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div className="eyebrow" style={{ justifyContent: "center" }}>
                <div className="eyebrow-line" />
                <span className="eyebrow-text">{t("valuesMainEyebrow")}</span>
                <div className="eyebrow-line" />
              </div>
              <h2 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, textAlign: "center" }}>
                {t("valuesMainTitle")}
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {values.map((value, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="detail-block" style={{ padding: "2rem", height: "100%", textAlign: "center" }}>
                  <span style={{ fontFamily: "var(--font-title)", color: "var(--clr-gold)", fontSize: "1.25rem", display: "block", marginBottom: "1rem", opacity: 0.8 }}>
                    {value.num}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.25rem", fontWeight: 500, marginBottom: "1rem", textAlign: "center" }}>
                    {value.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 1.8 }}>
                    {value.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULTURAL NARRATIVES ── */}
      <section style={{ ...S.sectionAlt, position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ maxWidth: 850, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div className="eyebrow" style={{ justifyContent: "center" }}>
                <div className="eyebrow-line" />
                <span className="eyebrow-text">{t("narrativesEyebrow")}</span>
                <div className="eyebrow-line" />
              </div>
              <h2 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, textAlign: "center" }}>
                {t("narrativesTitle1")}{" "}
                <span className="serif-italic" style={{ color: "var(--clr-gold)" }}>
                  {t("narrativesTitle2")}
                </span>
              </h2>
            </div>
          </Reveal>

          <div style={{ border: "1px solid var(--clr-border)" }}>
            {narratives.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  style={{
                    padding: "2rem",
                    borderBottom: i < 2 ? "1px solid var(--clr-border)" : "none",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "1.5rem",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.15rem", fontWeight: 500 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--clr-gold)", opacity: 0.8, marginTop: "0.35rem" }}>
                      {item.period}
                    </p>
                  </div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 1.8 }}>
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTION STATS ── */}
      <section style={S.section}>
        <div className="container" style={{ maxWidth: 850, textAlign: "center", margin: "0 auto" }}>
          <Reveal>
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              <div className="eyebrow-line" />
              <span className="eyebrow-text">{t("qualityEyebrow")}</span>
              <div className="eyebrow-line" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, marginBottom: "1.5rem", textAlign: "center" }}>
              {t("qualityTitle")}
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 2, maxWidth: 600, margin: "0 auto 3.5rem", textAlign: "center" }}>
              {t("qualityDesc")}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.5rem", border: "1px solid var(--clr-border)", padding: "2rem 1rem" }}>
              {[
                { number: "250", label: t("statGsm") },
                { number: "100%", label: t("statOrigin") },
                { number: "∞", label: t("statStories") },
                { number: "MMXXVI", label: t("statEst") },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="stat-num">{stat.number}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ ...S.sectionAlt, textAlign: "center", position: "relative" }}>
        <div className="container" style={{ maxWidth: 500, margin: "0 auto" }}>
          <Reveal>
            <span style={{ color: "var(--clr-gold)", fontSize: "1.2rem", display: "block", marginBottom: "1rem" }}>✦</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 400, marginBottom: "1rem", textAlign: "center" }}>
              {t("ctaTitle")}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 300, color: "var(--clr-muted)", lineHeight: 1.8, marginBottom: "2rem", textAlign: "center" }}>
              {t("ctaDesc")}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/collection" className="btn">
              <span>{t("ctaBtn")}</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
