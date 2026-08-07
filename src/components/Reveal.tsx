"use client";
import { useEffect, useRef, ReactNode, CSSProperties } from "react";

export default function Reveal({ children, delay = 0, className = "", style }: {
  children: ReactNode; delay?: number; className?: string; style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add("on"), delay);
        obs.unobserve(el);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`} style={style}>{children}</div>;
}
