"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { openCart, totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner" style={{ position: "relative" }}>
          
          {/* Left Navigation Links */}
          <div className="nav-links">
            <Link href="/" className="nav-link-item">
              {t("navHome")}
            </Link>
            <Link href="/collection" className="nav-link-item">
              {t("navCollection")}
            </Link>
            <Link href="/journal" className="nav-link-item">
              {t("navJournal")}
            </Link>
            <Link href="/about" className="nav-link-item">
              {t("navAbout")}
            </Link>
          </div>

          {/* Absolute Centered Logo */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            whiteSpace: "nowrap"
          }}>
            <Link href="/" className="nav-logo-text">
              LOS KAREL
            </Link>
          </div>

          {/* Right Navigation Links: Wishlist, Account/Login, Shop & Language */}
          <div className="nav-links" style={{ gap: "1.25rem" }}>
            
            {/* Account / Login Link */}
            <Link href={isAuthenticated ? "/account" : "/login"} className="nav-link-item" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span style={{ fontSize: "0.68rem" }}>
                {isAuthenticated ? (user?.name ? user.name.split(" ")[0] : t("navAccount")) : t("navLogin")}
              </span>
            </Link>

            {/* Wishlist Link */}
            <Link href="/wishlist" className="nav-link-item" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {totalWishlistItems > 0 && (
                  <span style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-8px",
                    background: "var(--clr-gold)",
                    color: "var(--clr-bg)",
                    fontSize: "0.55rem",
                    fontWeight: 600,
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-sans)"
                  }}>
                    {totalWishlistItems}
                  </span>
                )}
              </div>
            </Link>

            {/* Shop Cart Trigger */}
            <button
              onClick={openCart}
              className="nav-link-item"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0
              }}
            >
              <span>{t("navShop")}</span>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-8px",
                    background: "var(--clr-gold)",
                    color: "var(--clr-bg)",
                    fontSize: "0.55rem",
                    fontWeight: 600,
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-sans)"
                  }}>
                    {totalItems}
                  </span>
                )}
              </div>
            </button>

            {/* Language Switcher */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              fontFamily: "var(--font-title)",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              borderLeft: "1px solid var(--clr-border)",
              paddingLeft: "0.75rem"
            }}>
              <button
                onClick={() => setLang("TR")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: lang === "TR" ? "var(--clr-gold)" : "var(--clr-faint)",
                  fontWeight: lang === "TR" ? 600 : 400,
                  transition: "color 0.3s ease",
                  padding: 0
                }}
              >
                TR
              </button>
              <span style={{ color: "var(--clr-faint)", fontSize: "0.55rem" }}>/</span>
              <button
                onClick={() => setLang("EN")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: lang === "EN" ? "var(--clr-gold)" : "var(--clr-faint)",
                  fontWeight: lang === "EN" ? 600 : 400,
                  transition: "color 0.3s ease",
                  padding: 0
                }}
              >
                EN
              </button>
            </div>
          </div>

          {/* Hamburger menu */}
          <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span style={open ? { transform: "rotate(45deg) translate(4px, 5px)" } : {}} />
            <span style={open ? { opacity: 0 } : {}} />
            <span style={open ? { transform: "rotate(-45deg) translate(4px, -5px)" } : {}} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <Link href="/" onClick={() => setOpen(false)}>{t("navHome")}</Link>
        <Link href="/collection" onClick={() => setOpen(false)}>{t("navCollection")}</Link>
        <Link href="/journal" onClick={() => setOpen(false)}>{t("navJournal")}</Link>
        <Link href="/about" onClick={() => setOpen(false)}>{t("navAbout")}</Link>
        <Link href={isAuthenticated ? "/account" : "/login"} onClick={() => setOpen(false)}>
          {isAuthenticated ? t("navAccount") : t("navLogin")}
        </Link>
        <Link href="/wishlist" onClick={() => setOpen(false)}>{t("navWishlist")} ({totalWishlistItems})</Link>
        
        <button
          onClick={() => { setOpen(false); openCart(); }}
          style={{
            background: "none",
            border: "none",
            color: "var(--clr-text)",
            fontFamily: "var(--font-title)",
            fontSize: "1.5rem",
            letterSpacing: "0.2em",
            cursor: "pointer"
          }}
        >
          {t("navShop")} ({totalItems})
        </button>

        {/* Mobile Language Switcher */}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
          <button
            onClick={() => setLang("TR")}
            style={{
              background: "none",
              border: "1px solid " + (lang === "TR" ? "var(--clr-gold)" : "var(--clr-border)"),
              padding: "0.4rem 1rem",
              color: lang === "TR" ? "var(--clr-gold)" : "var(--clr-muted)",
              fontFamily: "var(--font-title)",
              fontSize: "0.75rem",
              cursor: "pointer"
            }}
          >
            TR
          </button>
          <button
            onClick={() => setLang("EN")}
            style={{
              background: "none",
              border: "1px solid " + (lang === "EN" ? "var(--clr-gold)" : "var(--clr-border)"),
              padding: "0.4rem 1rem",
              color: lang === "EN" ? "var(--clr-gold)" : "var(--clr-muted)",
              fontFamily: "var(--font-title)",
              fontSize: "0.75rem",
              cursor: "pointer"
            }}
          >
            EN
          </button>
        </div>
      </div>
    </>
  );
}
