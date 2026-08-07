"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginClient() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let success = false;
    if (isRegister) {
      success = await register(name, email, password);
    } else {
      success = await login(email, password);
    }

    setLoading(false);
    if (success) {
      router.push("/account");
    }
  };

  return (
    <section style={{ paddingTop: "10rem", paddingBottom: "8rem", background: "var(--clr-bg)", minHeight: "85vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: 480, margin: "0 auto" }}>
        
        <div className="detail-block" style={{ padding: "3rem 2.5rem" }}>
          
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: "1rem" }}>
            <div className="eyebrow-line" />
            <span className="eyebrow-text">{t("authEyebrow")}</span>
            <div className="eyebrow-line" />
          </div>

          <h1 style={{ fontFamily: "var(--font-title)", fontSize: "2rem", fontWeight: 400, textAlign: "center", marginBottom: "2rem" }}>
            {isRegister ? t("registerTitle") : t("loginTitle")}
          </h1>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {isRegister && (
              <div>
                <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                  {t("fullNameLabel")} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  style={{
                    width: "100%",
                    padding: "0.9rem 1rem",
                    background: "var(--clr-bg)",
                    border: "1px solid var(--clr-border)",
                    color: "var(--clr-text)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    outline: "none"
                  }}
                />
              </div>
            )}

            <div>
              <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                {t("emailLabel")} *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                style={{
                  width: "100%",
                  padding: "0.9rem 1rem",
                  background: "var(--clr-bg)",
                  border: "1px solid var(--clr-border)",
                  color: "var(--clr-text)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  outline: "none"
                }}
              />
            </div>

            <div>
              <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                Şifre *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "0.9rem 1rem",
                  background: "var(--clr-bg)",
                  border: "1px solid var(--clr-border)",
                  color: "var(--clr-text)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  outline: "none"
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-solid"
              style={{ width: "100%", padding: "1.1rem", marginTop: "0.75rem" }}
            >
              <span>{loading ? "Lütfen Bekleyiniz..." : isRegister ? t("registerBtn") : t("loginBtn")}</span>
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "2rem", borderTop: "1px solid var(--clr-border)", paddingTop: "1.5rem" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--clr-muted)" }}>
              {isRegister ? t("hasAccountPrompt") : t("noAccountPrompt")}{" "}
            </span>
            <button
              onClick={() => setIsRegister(!isRegister)}
              style={{
                background: "none",
                border: "none",
                color: "var(--clr-gold)",
                fontFamily: "var(--font-title)",
                fontSize: "0.75rem",
                cursor: "pointer",
                textDecoration: "underline"
              }}
            >
              {isRegister ? t("loginTitle") : t("registerTitle")}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
