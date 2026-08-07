"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutHeaderClient() {
  const { t } = useLanguage();

  return (
    <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "var(--clr-bg)", position: "relative", overflow: "hidden" }}>
      <div className="corner-tl" style={{ top: "5.5rem" }} />
      <div className="corner-tr" style={{ top: "5.5rem" }} />
      <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="eyebrow anim-fade-in" style={{ justifyContent: "center" }}>
          <div className="eyebrow-line" />
          <span className="eyebrow-text">{t("aboutHeaderEyebrow")}</span>
          <div className="eyebrow-line" />
        </div>
        <h1 className="anim-fade-up d1" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 300, letterSpacing: "0.06em" }}>
          {t("aboutHeaderTitle")} <span style={{ fontStyle: "italic", background: "linear-gradient(135deg, var(--clr-gold), var(--clr-gold2), var(--clr-gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>LOS KAREL</span>
        </h1>
        <p className="anim-fade-up d2" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontStyle: "italic", color: "var(--clr-muted)", marginTop: "1.25rem", fontWeight: 300 }}>
          {t("aboutHeaderSub")}
        </p>
      </div>
    </section>
  );
}
