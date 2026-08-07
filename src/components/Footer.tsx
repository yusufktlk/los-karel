"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" className="nav-logo" style={{ display: "inline-block", marginBottom: "1.25rem" }}>
              LOS KAREL
            </Link>
            <p className="footer-desc">
              {t("footerDesc")}
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="footer-label">{t("footerNavTitle")}</p>
            <Link href="/" className="footer-link">{t("navHome")}</Link>
            <Link href="/collection" className="footer-link">{t("navCollection")}</Link>
            <Link href="/about" className="footer-link">{t("navAbout")}</Link>
          </div>

          {/* Info */}
          <div>
            <p className="footer-label">{t("footerInfoTitle")}</p>
            {[t("footerShip"), t("footerReturn"), t("footerSize"), t("footerCare")].map((i) => (
              <span key={i} className="footer-link" style={{ cursor: "default" }}>{i}</span>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <p className="footer-label">{t("footerConnectTitle")}</p>
            <p className="footer-desc">
              {t("footerConnectDesc")}
            </p>
            <div className="newsletter-wrap">
              <input
                type="email"
                placeholder={t("newsletterInputPlaceholder")}
                className="newsletter-input"
                aria-label="Email for newsletter"
              />
              <button className="newsletter-btn">→</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="footer-bottom"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
          }}
        >
          {/* Left Column */}
          <span className="footer-copy" style={{ textAlign: "left" }}>
            © {new Date().getFullYear()} LOS KAREL. {t("footerRights")}
          </span>
          
          {/* Center Column: Perfectly Mathematical Centered Instagram Icon */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <a
              href="https://instagram.com/los.karel"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              title="Instagram: @los.karel"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 0,
                color: "var(--clr-gold)",
                textDecoration: "none",
                transition: "transform 0.3s ease, color 0.3s ease",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </a>
          </div>

          {/* Right Column */}
          <span className="footer-copy" style={{ textAlign: "right" }}>
            EST. MMXXVI
          </span>
        </div>
      </div>
    </footer>
  );
}
