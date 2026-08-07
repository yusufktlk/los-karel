"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function AdminLoginClient() {
  const [email, setEmail] = useState("admin@loskarel.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      const savedUser = JSON.parse(localStorage.getItem("los_karel_user") || "{}");
      if (savedUser.role === "ADMIN") {
        showToast("Yönetim Paneline erişim sağlandı");
        router.push("/admin");
      } else {
        showToast("Bu alana erişim yetkiniz bulunmamaktadır", "info");
      }
    }
  };

  return (
    <section style={{ paddingTop: "10rem", paddingBottom: "8rem", background: "var(--clr-bg)", minHeight: "85vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: 460, margin: "0 auto" }}>
        
        <div className="detail-block" style={{ padding: "3rem 2.5rem", border: "1px solid var(--clr-gold)" }}>
          
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: "1rem" }}>
            <div className="eyebrow-line" />
            <span className="eyebrow-text">GÜVENLİ YÖNETİCİ GİRİŞİ</span>
            <div className="eyebrow-line" />
          </div>

          <h1 style={{ fontFamily: "var(--font-title)", fontSize: "1.8rem", fontWeight: 400, textAlign: "center", marginBottom: "2rem" }}>
            LOS KAREL Admin
          </h1>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ fontFamily: "var(--font-title)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--clr-muted)", display: "block", marginBottom: "0.4rem" }}>
                Yönetici E-posta *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@loskarel.com"
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
                Yönetici Şifresi *
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
              <span>{loading ? "Doğrulanıyor..." : "Yönetim Paneline Giriş Yap →"}</span>
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
