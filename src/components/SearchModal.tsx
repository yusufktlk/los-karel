"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { fetchProductsAPI, fetchJournalAPI } from "@/services/api";
import { Product } from "@/data/products";
import { Article } from "@/data/journal";

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t, lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      async function loadData() {
        const [pData, aData] = await Promise.all([fetchProductsAPI(), fetchJournalAPI()]);
        if (pData) setProducts(pData);
        if (aData) setArticles(aData);
      }
      loadData();
    } else {
      setSearchTerm("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const term = searchTerm.trim().toLowerCase();

  const filteredProducts = term
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.story.toLowerCase().includes(term) ||
          p.tags.some((tag) => tag.toLowerCase().includes(term))
      )
    : [];

  const filteredArticles = term
    ? articles.filter((a) => {
        const title = lang === "TR" ? a.titleTR : a.titleEN;
        const sub = lang === "TR" ? a.subtitleTR : a.subtitleEN;
        return title.toLowerCase().includes(term) || sub.toLowerCase().includes(term);
      })
    : [];

  const hasSearch = term.length > 0;
  const noResults = hasSearch && filteredProducts.length === 0 && filteredArticles.length === 0;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(10, 10, 10, 0.94)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "6rem",
        paddingBottom: "4rem",
        overflowY: "auto",
      }}
    >
      <div className="container" style={{ maxWidth: 760, width: "100%" }}>
        
        {/* Search Input Bar */}
        <div style={{ position: "relative", borderBottom: "1px solid var(--clr-gold)", paddingBottom: "1rem", marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--clr-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("searchPlaceholder")}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "var(--font-title)",
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
                fontWeight: 300,
                color: "var(--clr-text)",
              }}
            />
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "1px solid var(--clr-border)",
                color: "var(--clr-muted)",
                fontSize: "1rem",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--clr-muted)", marginTop: "0.5rem", display: "block" }}>
            {t("searchEscTip")}
          </span>
        </div>

        {/* Results Container */}
        {hasSearch ? (
          noResults ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
              <span style={{ color: "var(--clr-gold)", fontSize: "2rem", opacity: 0.5, display: "block", marginBottom: "1rem" }}>✦</span>
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--clr-muted)", fontSize: "1rem" }}>
                {t("searchNoResults")}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              
              {/* Products Section */}
              {filteredProducts.length > 0 && (
                <div>
                  <h3 style={{ fontFamily: "var(--font-title)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--clr-gold)", marginBottom: "1.5rem" }}>
                    {t("searchProductsSection")} ({filteredProducts.length})
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={onClose}
                        className="detail-block"
                        style={{ padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "center", textDecoration: "none", color: "inherit" }}
                      >
                        <div style={{ position: "relative", width: "56px", height: "70px", border: "1px solid var(--clr-border)", flexShrink: 0, overflow: "hidden" }}>
                          <Image src={p.images.back} alt={p.name} fill style={{ objectFit: "cover" }} />
                        </div>
                        <div>
                          <h4 style={{ fontFamily: "var(--font-title)", fontSize: "0.9rem", fontWeight: 500 }}>
                            {p.name}
                          </h4>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--clr-muted)", margin: "0.2rem 0" }}>
                            {p.inspiration}
                          </p>
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--clr-gold)" }}>
                            ₺{p.price.toLocaleString("tr-TR")}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Journal Section */}
              {filteredArticles.length > 0 && (
                <div>
                  <h3 style={{ fontFamily: "var(--font-title)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--clr-gold)", marginBottom: "1.5rem" }}>
                    {t("searchJournalSection")} ({filteredArticles.length})
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {filteredArticles.map((a) => {
                      const title = lang === "TR" ? a.titleTR : a.titleEN;
                      const sub = lang === "TR" ? a.subtitleTR : a.subtitleEN;
                      return (
                        <Link
                          key={a.id}
                          href={`/journal/${a.slug}`}
                          onClick={onClose}
                          className="detail-block"
                          style={{ padding: "1.25rem", display: "flex", gap: "1.25rem", alignItems: "center", textDecoration: "none", color: "inherit" }}
                        >
                          <div style={{ position: "relative", width: "70px", height: "50px", border: "1px solid var(--clr-border)", flexShrink: 0, overflow: "hidden" }}>
                            <Image src={a.image} alt={title} fill style={{ objectFit: "cover" }} />
                          </div>
                          <div>
                            <span style={{ fontFamily: "var(--font-title)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--clr-gold)" }}>
                              {a.date} · {a.readTime}
                            </span>
                            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 300, marginTop: "0.2rem" }}>
                              {title}
                            </h4>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--clr-muted)" }}>
                              {sub}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )
        ) : (
          <div style={{ textAlign: "center", padding: "3rem 1rem", opacity: 0.6 }}>
            <p style={{ fontFamily: "var(--font-sans)", color: "var(--clr-muted)", fontSize: "0.9rem" }}>
              Örnek aramalar: <strong style={{ color: "var(--clr-gold)" }}>İznik</strong>, <strong style={{ color: "var(--clr-gold)" }}>Kilim</strong>, <strong style={{ color: "var(--clr-gold)" }}>Heritage</strong>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
