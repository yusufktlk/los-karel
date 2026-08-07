"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutHeaderClient() {
  const { t } = useLanguage();

  return (
    <section style={{
      paddingTop: "9rem",
      paddingBottom: "4.5rem",
      background: "var(--clr-bg)",
      position: "relative",
      overflow: "hidden",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
    }}>
      <div className="corner-tl" style={{ top: "5.5rem" }} />
      <div className="corner-tr" style={{ top: "5.5rem" }} />

      <div className="container" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto"
      }}>
        {/* Centered Eyebrow */}
        <div className="anim-fade-in" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          marginBottom: "1.75rem",
          width: "100%"
        }}>
          <div style={{ width: "3rem", height: "1px", background: "linear-gradient(90deg, transparent, var(--clr-gold))" }} />
          <span style={{
            fontFamily: "var(--font-title)",
            fontSize: "0.68rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "var(--clr-gold)",
            fontWeight: 500,
            whiteSpace: "nowrap"
          }}>
            {t("aboutHeaderEyebrow")}
          </span>
          <div style={{ width: "3rem", height: "1px", background: "linear-gradient(-90deg, transparent, var(--clr-gold))" }} />
        </div>

        {/* Clean Single Headline: Hakkımızda / About */}
        <h1 className="anim-fade-up d1" style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 400,
          letterSpacing: "0.06em",
          lineHeight: 1.1,
          color: "var(--clr-text)",
          textAlign: "center",
          width: "100%",
          display: "block",
          margin: "0 auto 1.5rem"
        }}>
          {t("aboutHeaderTitle")}
        </h1>

        {/* Subtitle */}
        <p className="anim-fade-up d2" style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
          fontStyle: "italic",
          color: "var(--clr-muted)",
          fontWeight: 300,
          textAlign: "center",
          maxWidth: "650px",
          margin: "0 auto",
          lineHeight: 1.6
        }}>
          {t("aboutHeaderSub")}
        </p>
      </div>
    </section>
  );
}
