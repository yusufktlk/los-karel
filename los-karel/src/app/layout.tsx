import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProvider from "@/components/ClientProvider";

export const metadata: Metadata = {
  title: "LOS KAREL — Rooted in Heritage, Made for Today",
  description:
    "LOS KAREL is a premium contemporary clothing label where every garment is treated as a collectible design object. Inspired by Anatolian heritage, Japanese aesthetics, and cultural narratives.",
  keywords: [
    "LOS KAREL",
    "premium clothing",
    "heritage fashion",
    "İznik",
    "Anatolian design",
    "luxury streetwear",
    "collectible fashion",
  ],
  openGraph: {
    title: "LOS KAREL — Rooted in Heritage, Made for Today",
    description:
      "Premium contemporary clothing label. Every garment is a collectible design object.",
    type: "website",
    locale: "tr_TR",
    siteName: "LOS KAREL",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr">
      <body>
        <ClientProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
