"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image src="/logo/logo.png" alt="LOS KAREL" width={52} height={52}
                style={{ borderRadius: "50%", objectFit: "contain", marginBottom: "1.25rem" }} />
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
            {[t("footerShip"), t("footerReturn"), t("footerSize"), t("footerCare")].map(i => (
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
              <input type="email" placeholder={t("newsletterInputPlaceholder")}
                className="newsletter-input" aria-label="Email for newsletter" />
              <button className="newsletter-btn">→</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} LOS KAREL. {t("footerRights")}</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="https://instagram.com/loskarel" target="_blank" rel="noopener noreferrer"
              className="footer-link" style={{ marginBottom: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </a>
          </div>
          <span className="footer-copy">EST. MMXXVI</span>
        </div>
      </div>
    </footer>
  );
}
