import { Metadata } from "next";
import AboutHeaderClient from "@/components/AboutHeaderClient";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About — LOS KAREL",
  description: "Discover the story behind LOS KAREL. A premium contemporary clothing label inspired by cultural narratives and Anatolian heritage.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHeaderClient />
      <div style={{ borderTop: "1px solid var(--clr-border)" }} />
      <AboutClient />
    </>
  );
}
