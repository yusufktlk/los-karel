"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathname = usePathname();
  const { totalItems, toggleCart } = useCart();
  const { wishlist } = useWishlist();
  const { lang, setLang, t } = useLanguage();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(lang === "TR" ? "EN" : "TR");
  };

  const navLinks = [
    { href: "/", label: t("navHome") },
    { href: "/collection", label: t("navCollection") },
    { href: "/journal", label: t("navJournal") },
    { href: "/about", label: t("navAbout") },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          {/* Left Nav */}
          <nav className="nav-menu desktop-only">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
          </button>

          {/* Center Logo */}
          <Link href="/" className="nav-logo">
            LOS KAREL
          </Link>

          {/* Right Actions */}
          <div className="nav-actions">
            {/* Live Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="icon-btn"
              title="Arama Yap"
              style={{ fontSize: "1rem" }}
            >
              🔍
            </button>

            {/* Language Switcher */}
            <button onClick={toggleLanguage} className="lang-switcher" title="Switch Language">
              {lang}
            </button>

            {/* Account / Login */}
            <Link
              href={isAuthenticated ? "/account" : "/login"}
              className={`icon-btn ${pathname === "/account" || pathname === "/login" ? "active" : ""}`}
              title={isAuthenticated ? user?.name || t("navAccount") : t("navLogin")}
            >
              👤
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className={`icon-btn ${pathname === "/wishlist" ? "active" : ""}`} title={t("navWishlist")}>
              ♥
              {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
            </Link>

            {/* Cart Drawer Trigger */}
            <button onClick={toggleCart} className="icon-btn cart-icon" title="Bag">
              <span>BAG</span>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-menu anim-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-link"
            >
              {t("navWishlist")} ({wishlist.length})
            </Link>
            <Link
              href={isAuthenticated ? "/account" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-link"
            >
              {isAuthenticated ? t("navAccount") : t("navLogin")}
            </Link>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Live Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
